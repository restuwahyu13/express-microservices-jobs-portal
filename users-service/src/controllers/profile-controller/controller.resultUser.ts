import { Request, Response } from 'express'
import { setResultUserPublisher } from '../../services/publisher/external-publisher/service.resultUser'
import { initResultUsersSubscriber } from '../../services/subscriber/profile-subscriber/service.resultUser'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'
import { kafkaConsumer, kafkaProducer } from '../../utils/util.kafka'
import { setDeleteUserPublisher } from '../../services/publisher/external-publisher/service.deleteUser'

export const resultUserController = async (req: Request, res: Response): Promise<void> => {
	const response = await kafkaConsumer('fromProfile:result')
	await setDeleteUserPublisher({ userId: response.messages.userId })
	await setResultUserPublisher({ userId: response.messages.userId })
	await initResultUsersSubscriber()
	const { status, message, data } = await getResponseSubscriber()

	if (status >= 400) {
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	} else {
		await kafkaProducer('toProfile:result', data)
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	}
}
