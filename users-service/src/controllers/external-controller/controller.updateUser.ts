import { Request, Response } from 'express'
import { setUpdateUserPublisher } from '../../services/publisher/external-publisher/service.updateUser'
import { initUpdateUserSubscriber } from '../../services/subscriber/external-subscriber/service.updateUser'
import { streamBox } from '../../utils/util.stream'
import { getResponseSubscriber } from '../../utils/util.message'
import { getStoreCache } from '../../utils/util.cache'
import { IUser } from '../../interface/interface.user'

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
	const response = (await getStoreCache('fromProfile:update')) as IUser
	await setUpdateUserPublisher({
		userId: response.userId,
		firstName: response.firstName,
		lastName: response.lastName,
		email: response.email,
		location: response.location,
		phone: response.phone
	})
	await initUpdateUserSubscriber()
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
