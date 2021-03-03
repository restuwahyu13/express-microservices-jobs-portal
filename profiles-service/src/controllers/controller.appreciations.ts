import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { initDeleteAppreciationsSubscriber, initUpdateAppreciationsSubscriber } from '../services/subscriber/service.appreciation'
import { setDeleteAppreciationsPublisher, setUpdateAppreciationsPublisher } from '../services/publisher/service.appreciation'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'

export const appreciationsDeleteController = async (req: Request, res: Response): Promise<void> => {
	await setDeleteAppreciationsPublisher({ appreciations: { appreciationId: req.params.appreciationId } })
	await initDeleteAppreciationsSubscriber()
	const { status, message } = await getResponseSubscriber(`appreciations:delete:${uuid()}`)

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

export const appreciationsUpdateController = async (req: Request, res: Response): Promise<void> => {
	await setUpdateAppreciationsPublisher({
		appreciations: {
			appreciationId: req.params.appreciationId,
			awardTitle: req.body.awardTitle,
			achievementTitle: req.body.achievementTitle,
			awardYear: req.body.awardYear,
			awardInformation: req.body.awardInformation
		}
	})
	await initUpdateAppreciationsSubscriber()
	const { status, message } = await getResponseSubscriber(`appreciations:update:${uuid()}`)

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
