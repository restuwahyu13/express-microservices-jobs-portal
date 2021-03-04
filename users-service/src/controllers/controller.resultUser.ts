import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { setResultUserPublisher } from '../services/publisher/service.resultUser'
import { initResultUserSubscriber } from '../services/subscriber/service.resultUser'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'
import { getStoreCache, setStoreCache } from '../utils/util.cache'

export const resultUserController = async (req: Request, res: Response): Promise<void> => {
	const { userId } = await getStoreCache('fromProfile:result')
	await setResultUserPublisher({ userId: userId })
	await initResultUserSubscriber()
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
