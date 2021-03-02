import { Request, Response } from 'express'
import { initDeleteVolunteersSubscriber, initUpdateVolunteersSubscriber } from '../services/subscriber/service.volunteer'
import { setDeleteVolunteersPublisher, setUpdateVolunteersPublisher } from '../services/publisher/service.volunteer'
import { getResponseSubscriber } from '../../../users-service/src/utils/util.message'
import { streamBox } from '../../../users-service/src/utils/util.stream'

export const volunteersDeleteController = async (req: Request, res: Response): Promise<void> => {
	await setDeleteVolunteersPublisher({ userId: req.params.userId, skills: req.body.skills })
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
		userId: req.params.userId,
		volunteers: {
			volunteerId: req.body.volunteerId,
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
