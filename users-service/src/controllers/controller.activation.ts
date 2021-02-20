import { Request, Response } from 'express'
import { setActivationPublisher } from '../services/publisher/service.activation'
import { getActivationSubscriber } from '../services/subscriber/service.activation'
import { streamBox } from '../utils/util.stream'
import { verifySignAccessToken } from '../utils/util.jwt'
import { expressValidator } from '../utils/util.validator'

export const activationController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		const activationToken = verifySignAccessToken()(req.params.token)

		if (!activationToken) {
			streamBox(res, 401, {
				method: req.method,
				status: 401,
				message: 'activation token is not valid or expired, please resend new token'
			})
		} else {
			await setActivationPublisher({ ...activationToken })
			const { statusCode, message } = await getActivationSubscriber()

			if (statusCode >= 400) {
				streamBox(res, statusCode, {
					method: req.method,
					status: statusCode,
					message
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
