import { Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import { ClientResponse } from '@sendgrid/client/src/response'
import { setRegisterPublisher } from '../../services/publisher/auth-publisher/service.register'
import { initRegisterSubscriber } from '../../services/subscriber/auth-subscriber/service.register'
import { streamBox } from '../../utils/util.stream'
import { getResponseSubscriber } from '../../utils/util.message'
import { tempMailRegister } from '../../templates/template.register'
import { IRegisterMail } from '../../interface/iterface.tempmail'
import { IUser } from '../../interface/interface.user'
import { randomString } from '../../utils/util.randomString'
import { setStoreToken } from '../../utils/util.storeToken'

export const registerController = async (req: Request, res: Response): Promise<void> => {
	const { firstName, lastName, email, password, location, phone }: IUser = req.body
	await setRegisterPublisher({ firstName, lastName, email, password, location, phone })
	await initRegisterSubscriber()
	const { status, message } = await getResponseSubscriber()

	if (status >= 400) {
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	} else {
		const uniqueString = randomString()
		await setStoreToken({ email: email, token: uniqueString }, 'minute', 3)
		const template: IRegisterMail = tempMailRegister(email, uniqueString)

		sgMail.setApiKey(process.env.SG_API_KEY)
		const sgResponse: [ClientResponse, any] = await sgMail.send(template)

		if (!sgResponse) {
			streamBox(res, 500, {
				method: req.method,
				status: 500,
				message: 'Server error failed to sending email activation'
			})
		} else {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		}
	}
}
