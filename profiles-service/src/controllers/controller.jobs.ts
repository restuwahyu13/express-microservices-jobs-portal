import { Request, Response } from 'express'
import { initDeleteJobsSubscriber, initUpdateJobsSubscriber } from '../services/subscriber/service.jobs'
import { setDeleteJobsPublisher, setUpdateJobsPublisher } from '../services/publisher/service.jobs'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'
import { uniqueId } from '../utils/util.unique'

export const jobsDeleteController = async (req: Request, res: Response): Promise<void> => {
	await setDeleteJobsPublisher({
		jobPreferences: {
			jobsId: req.params.jobId,
			jobInterests: req.body.jobInterests,
			workTypes: req.body.workTypes,
			workCityPreferences: req.body.workCityPreferences
		}
	})
	await initDeleteJobsSubscriber()
	const { status, message } = await getResponseSubscriber(`jobs:${uniqueId()}`)

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
			jobsId: req.params.jobId,
			salaryExpectation: req.params.salaryExpectation,
			jobInterests: req.body.jobInterests,
			workTypes: req.body.workTypes,
			workCityPreferences: req.body.workCityPreferences
		}
	})
	await initUpdateJobsSubscriber()
	const { status, message } = await getResponseSubscriber(`jobs:${uniqueId()}`)

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
