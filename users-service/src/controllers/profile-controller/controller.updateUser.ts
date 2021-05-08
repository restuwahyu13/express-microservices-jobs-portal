import { Request, Response } from 'express'
import { setUpdateUserPublisher } from '../../services/publisher/external-publisher/service.updateUser'
import { initUpdateUsersSubscriber } from '../../services/subscriber/profile-subscriber/service.updateUser'
import { streamBox } from '../../utils/util.stream'
import { getResponseSubscriber } from '../../utils/util.message'
import { kafkaConsumer } from '../../utils/util.kafka'

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
	const response = await kafkaConsumer('fromProfile:update')
	await setUpdateUserPublisher({
		userId: response.messages.userId,
		firstName: response.messages.firstName,
		lastName: response.messages.lastName,
		email: response.messages.email,
		location: response.messages.location,
		phone: response.messages.phone
	})
	await initUpdateUsersSubscriber()
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
