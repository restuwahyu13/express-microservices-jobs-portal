import { Request, Response } from 'express'
import { initDeleteVolunteersSubscriber, initUpdateVolunteersSubscriber } from '../services/subscriber/service.volunteer'
import { setDeleteVolunteersPublisher, setUpdateVolunteersPublisher } from '../services/publisher/service.volunteer'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'

export const volunteersDeleteController = async (req: Request, res: Response): Promise<void> => {
	await setDeleteVolunteersPublisher({ volunteers: { volunteerId: req.params.volunterId } })
	await initDeleteVolunteersSubscriber()
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

export const volunteersUpdateController = async (req: Request, res: Response): Promise<void> => {
	await setUpdateVolunteersPublisher({
		volunteers: {
			volunteerId: req.params.volunterId,
			organizationName: req.body.organizationName,
			organizationPosition: req.body.organizationPosition,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			organizationInformation: req.body.organizationInformation
		}
	})
	await initUpdateVolunteersSubscriber()
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
