import { Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import { ClientResponse } from '@sendgrid/client/src/response'
import { setRegisterPublisher } from '../services/publisher/service.register'
import { getRegisterSubscriber } from '../services/subscriber/service.register'
import { streamBox } from '../utils/util.stream'
import { signAccessToken } from '../utils/util.jwt'
import { tempMailRegister } from '../templates/template.register'
import { expressValidator } from '../utils/util.validator'
import { IRegisterMail } from '../interface/iterface.tempmail'
import { IUser } from '../interface/interface.user'
import { IJwt } from '../interface/interface.jwt'

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
		const { statusCode, message, data } = await getRegisterSubscriber()

		if (statusCode >= 400) {
			streamBox(res, statusCode, {
				method: req.method,
				status: statusCode,
				message
			})
		} else {
			const { accessToken }: IJwt = signAccessToken()(res, { id: data.id, email: data.email }, { expiresIn: '90d' })
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
				streamBox(res, statusCode, {
					method: req.method,
					status: statusCode,
					message
				})
			}
		}
	}
}
