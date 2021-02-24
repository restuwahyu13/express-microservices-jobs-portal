import { Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import { ClientResponse } from '@sendgrid/client/src/response'
import { setForgotPublisher } from '../services/publisher/service.forgot'
import { initForgotSubscriber } from '../services/subscriber/service.forgot'
import { streamBox } from '../utils/util.stream'
import { signAccessToken } from '../utils/util.jwt'
import { expressValidator } from '../utils/util.validator'
import { toObject } from '../utils/util.parse'
import { getResponseSubscriber } from '../utils/util.message'
import { tempMailReset } from '../templates/template.reset'
import { IRegisterMail } from '../interface/iterface.tempmail'
import { IJwt } from '../interface/interface.jwt'

export const forgotController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setForgotPublisher({ email: req.body.email })
		await initForgotSubscriber()
		const { status, message, data } = await getResponseSubscriber()

		if (status >= 400) {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		} else {
			const { _id, email } = toObject(data)
			const { accessToken }: IJwt = signAccessToken()(res, { id: _id, email: email }, { expiresIn: '5m' })
			const template: IRegisterMail = tempMailReset(email, accessToken)

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
