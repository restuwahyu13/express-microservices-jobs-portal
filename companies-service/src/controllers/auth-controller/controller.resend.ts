import { Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import { ClientResponse } from '@sendgrid/client/src/response'
import { setResendPublisher } from '../../services/publisher/auth-publisher/service.resend'
import { initResendSubscriber } from '../../services/subscriber/auth-subscriber/service.resend'
import { streamBox } from '../../utils/util.stream'
import { signAccessToken } from '../../utils/util.jwt'
import { expressValidator } from '../../utils/util.validator'
import { getResponseSubscriber } from '../../utils/util.message'
import { tempMailResend } from '../../templates/template.resend'
import { IRegisterMail } from '../../interface/iterface.tempmail'
import { IJwt } from '../../interface/interface.jwt'

export const resendController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setResendPublisher({ email: req.body.email })
		await initResendSubscriber()
		const { status, message, data } = await getResponseSubscriber()

		if (status >= 400) {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		} else {
			const { accessToken }: IJwt = signAccessToken()(res, { id: data._id, email: data.email }, { expiresIn: '5m' })
			const template: IRegisterMail = tempMailResend(data.email, accessToken)

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
