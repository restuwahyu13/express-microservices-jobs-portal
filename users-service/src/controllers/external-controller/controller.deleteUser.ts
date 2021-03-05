import { Request, Response } from 'express'
import { setDeleteUserPublisher } from '../../services/publisher/external-publisher/service.deleteUser'
import { initDeleteUserSubscriber } from '../../services/subscriber/external-subscriber/service.deleteUser'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'
import { getStoreCache } from '../../utils/util.cache'

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
	const response = await getStoreCache('fromProfile:delete')
	await setDeleteUserPublisher({ userId: response.userId })
	await initDeleteUserSubscriber()
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
