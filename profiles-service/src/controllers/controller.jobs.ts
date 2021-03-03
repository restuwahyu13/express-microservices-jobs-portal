import { Request, Response } from 'express'
import { initDeleteJobsSubscriber, initUpdateJobsSubscriber } from '../services/subscriber/service.jobs'
import { setDeleteJobsPublisher, setUpdateJobsPublisher } from '../services/publisher/service.jobs'
import { getResponseSubscriber } from '../../../users-service/src/utils/util.message'
import { streamBox } from '../../../users-service/src/utils/util.stream'

export const jobsDeleteController = async (req: Request, res: Response): Promise<void> => {
	await setDeleteJobsPublisher({
		jobPreferences: {
			jobsId: req.params.jobsId,
			jobInterests: req.body.jobInterests,
			workTypes: req.body.workTypes,
			workCityPreferences: req.body.workCityPreferences
		}
	})
	await initDeleteJobsSubscriber()
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

export const jobsUpdateController = async (req: Request, res: Response): Promise<void> => {
	await setUpdateJobsPublisher({
		jobPreferences: {
			jobsId: req.params.jobsId,
			salaryExpectation: req.params.salaryExpectation,
			jobInterests: req.body.jobInterests,
			workTypes: req.body.workTypes,
			workCityPreferences: req.body.workCityPreferences
		}
	})
	await initUpdateJobsSubscriber()
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
