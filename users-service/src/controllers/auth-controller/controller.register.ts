import { Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import { ClientResponse } from '@sendgrid/client/src/response'
import { setRegisterPublisher } from '../../services/publisher/auth-publisher/service.register'
import { initRegisterSubscriber } from '../../services/subscriber/auth-subscriber/service.register'
import { streamBox } from '../../utils/util.stream'
import { signAccessToken } from '../../utils/util.jwt'
import { getResponseSubscriber } from '../../utils/util.message'
import { tempMailRegister } from '../../templates/template.register'
import { expressValidator } from '../../utils/util.validator'
import { IRegisterMail } from '../../interface/iterface.tempmail'
import { IUser } from '../../interface/interface.user'
import { IJwt } from '../../interface/interface.jwt'

export const registerController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		const { firstName, lastName, email, password, location, phone }: IUser = req.body
		await setRegisterPublisher({ firstName, lastName, email, password, location, phone })
		await initRegisterSubscriber()
		const { status, message, data } = await getResponseSubscriber()

		if (status >= 400) {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		} else {
			const { accessToken }: IJwt = signAccessToken()(res, { id: data._id, email: data.email }, { expiresIn: '5m' })
			const template: IRegisterMail = tempMailRegister(data.email, accessToken)

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
}
