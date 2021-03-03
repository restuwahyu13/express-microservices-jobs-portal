import { Request, Response } from 'express'
import { initDeleteEducationSubscriber, initUpdateEducationsSubscriber } from '../services/subscriber/service.education'
import { setDeleteEducationsPublisher, setUpdateEducationsPublisher } from '../services/publisher/service.education'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'

export const educationsDeleteController = async (req: Request, res: Response): Promise<void> => {
	await setDeleteEducationsPublisher({ educations: { educationId: req.params.educationId } })
	await initDeleteEducationSubscriber()
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

export const educationsUpdateController = async (req: Request, res: Response): Promise<void> => {
	await setUpdateEducationsPublisher({
		educations: {
			educationId: req.params.educationId,
			institutionName: req.body.institutionName,
			educationDegree: req.body.educationDegree,
			fieldStudy: req.body.fieldStudy,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			educationInformation: req.body.educationInformation
		}
	})
	await initUpdateEducationsSubscriber()
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
