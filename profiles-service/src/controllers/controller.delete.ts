import { Request, Response } from 'express'
import { initDeleteSkillsSubscriber } from '../services/subscriber/service.skills'
import { setDeleteSkillsPublisher } from '../services/publisher/service.skills'
import { getResponseSubscriber } from '../../../users-service/src/utils/util.message'
import { streamBox } from '../../../users-service/src/utils/util.stream'

export const deleteController = async (req: Request, res: Response): Promise<void> => {
	await setDeleteSubProfilePublisher({ userId: req.params.userId, subId: req.params.subId })
	await initDeletetSubProfileSubscriber()
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
