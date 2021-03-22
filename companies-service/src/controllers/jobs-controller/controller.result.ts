import { Request, Response } from 'express'
import { setResultJobsPostCompaniesPublisher } from '../../services/publisher/jobs-publisher/service.result'
import { initResultJobsPostCompaniesSubscriber } from '../../services/subscriber/jobs-subscriber/service.result'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'
import { expressValidator } from '../../utils/util.validator'

export const resultJobsPostController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setResultJobsPostCompaniesPublisher({ companiesId: req.params.companiesId })
		await initResultJobsPostCompaniesSubscriber()
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
				jobsPost: data
			})
		}
	}
}
