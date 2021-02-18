import { Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import { ClientResponse } from '@sendgrid/client/src/response'
import { setResendPublisher } from '../services/publisher/service.resend'
import { getResendSubscriber } from '../services/subscriber/service.resend'
import { streamBox } from '../utils/util.stream'
import { signAccessToken } from '../utils/util.jwt'
import { tempMailRegister } from '../templates/template.register'
import { IRegisterMail } from '../interface/iterface.tempmail'
import { IJwt } from '../interface/interface.jwt'

export const resendController = async (req: Request, res: Response): Promise<void> => {
	await setResendPublisher({ email: req.body.email })
	const { statusCode, message, data } = await getResendSubscriber()

	if (statusCode >= 400) {
		streamBox(res, statusCode, {
			method: req.method,
			statusCode: statusCode,
			message: message
		})
	} else {
		const { accessToken }: IJwt = signAccessToken()(res, { id: data._id, email: data.email }, { expiresIn: '5m' })
		const template: IRegisterMail = tempMailRegister(data.email, accessToken)

		sgMail.setApiKey(process.env.SG_API_KEY)
		const sgResponse: [ClientResponse, any] = await sgMail.send(template)
		if (!sgResponse) {
			streamBox(res, 500, {
				method: req.method,
				statusCode: 500,
				message: 'Server error failed to sending email activation'
			})
		} else {
			streamBox(res, statusCode, {
				method: req.method,
				status: statusCode,
				message: message
			})
		}
	}
}
