import { Request, Response } from 'express'
import { setActivationPublisher } from '../../services/publisher/auth-publisher/service.activation'
import { initActivationSubscriber } from '../../services/subscriber/auth-subscriber/service.activation'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'
import { getStoreToken } from '../../utils/util.storeToken'

export const activationController = async (req: Request, res: Response): Promise<void> => {
	const activationTokenExpired = await getStoreToken(req.params.token)

	if (activationTokenExpired.expired < 0 || req.params.token !== activationTokenExpired.data.token) {
		streamBox(res, 403, {
			method: req.method,
			status: 403,
			message: 'activationToken expired or invalid, please resend new activationToken'
		})
	} else {
		await setActivationPublisher({ email: activationTokenExpired.data.email })
		await initActivationSubscriber()
		const { status, message } = await getResponseSubscriber()

		if (status >= 400) {
			streamBox(res, status, {
				method: req.method,
				status,
				message
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
