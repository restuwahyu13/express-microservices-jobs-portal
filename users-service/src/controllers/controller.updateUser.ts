import { Request, Response } from 'express'
import { setGetUserPublisher } from '../services/publisher/service.resultUser'
import { initResultUserSubscriber } from '../services/subscriber/service.resultUser'
import { streamBox } from '../utils/util.stream'
import { expressValidator } from '../utils/util.validator'
import { getResponseSubscriber } from '../utils/util.message'

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setGetUserPublisher({ id: req.params.id })
		await initResultUserSubscriber()
		const { status, message, data } = await getResponseSubscriber()

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
				message,
				data: data
			})
		}
	}
}
