import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { initDeleteAppreciatinsSubscriber, initUpdateAppreciationsSubscriber } from '../services/subscriber/service.appreciation'
import { setDeleteAppreciationsPublisher, setUpdateAppreciationsPublisher } from '../services/publisher/service.appreciation'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'

export const appreciationsDeleteController = async (req: Request, res: Response): Promise<void> => {
	await setDeleteAppreciationsPublisher({ works: { workId: req.params.workId } })
	await initDeleteAppreciatinsSubscriber()
	const { status, message } = await getResponseSubscriber(`appreciations:${uuid()}`)

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
		works: {
			workId: req.params.workId,
			companyName: req.body.companyName,
			jobPosition: req.body.jobPosition,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			workInformation: req.body.workInformation
		}
	})
	await initUpdateAppreciationsSubscriber()
	const { status, message } = await getResponseSubscriber(`appreciations:${uuid()}`)

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
