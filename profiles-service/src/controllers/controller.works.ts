import { Request, Response } from 'express'
import { initDeleteWorksSubscriber, initUpdateWorksSubscriber } from '../services/subscriber/service.work'
import { setDeleteWorksPublisher, setUpdateWorksPublisher } from '../services/publisher/service.work'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'
import { expressValidator } from '../utils/util.validator'

export const worksDeleteController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setDeleteWorksPublisher({ works: { workId: req.params.workId } })
		await initDeleteWorksSubscriber()
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
}

export const worksUpdateController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setUpdateWorksPublisher({
			works: {
				workId: req.params.workId,
				companyName: req.body.companyName,
				jobPosition: req.body.jobPosition,
				startDate: req.body.startDate,
				endDate: req.body.endDate,
				workInformation: req.body.workInformation
			}
		})
		await initUpdateWorksSubscriber()
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
}
