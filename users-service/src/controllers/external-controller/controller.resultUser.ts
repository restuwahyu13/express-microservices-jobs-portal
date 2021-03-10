import { Request, Response } from 'express'
import { setResultUserPublisher } from '../../services/publisher/external-publisher/service.resultUser'
import { initResultUsersSubscriber } from '../../services/subscriber/external-subscriber/service.resultUser'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'
import { getStoreCache, setStoreCache } from '../../utils/util.cache'
import { IUser } from '../../interface/interface.user'

export const resultUserController = async (req: Request, res: Response): Promise<void> => {
	const response: IUser = await getStoreCache('fromProfile:result')
	await setResultUserPublisher({ userId: response.userId })
	await initResultUsersSubscriber()
	const { status, message, data } = await getResponseSubscriber()

	if (status >= 400) {
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	} else {
		await setStoreCache('toProfile:result', data)
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	}
}
