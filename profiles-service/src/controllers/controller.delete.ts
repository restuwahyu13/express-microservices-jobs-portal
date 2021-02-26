import { Request, Response } from 'express'
import { initResultProfileSubscriber } from '../services/subscriber/service.profile'
import { setResultProfilePublisher } from '../services/publisher/service.profile'
import { getResponseSubscriber } from '../../../users-service/src/utils/util.message'
import { streamBox } from '../../../users-service/src/utils/util.stream'

export const deleteController = async (req: Request, res: Response): Promise<void> => {
	await setResultProfilePublisher({ userId: req.params.id })
	await initResultProfileSubscriber()
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
			user: data
		})
	}
}
