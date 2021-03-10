import { Request, Response } from 'express'
import { initDeleteJobsSubscriber, initUpdateJobsSubscriber } from '../services/subscriber/service.jobs'
import { setDeleteJobsPublisher, setUpdateJobsPublisher } from '../services/publisher/service.jobs'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'
import { expressValidator } from '../utils/util.validator'

export const jobsDeleteController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setDeleteJobsPublisher({
			jobPreferences: {
				jobsId: req.params.jobId,
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
}

export const jobsUpdateController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
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
