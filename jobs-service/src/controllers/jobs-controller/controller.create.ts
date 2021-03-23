import { Request, Response, NextFunction } from 'express'
import { setCreateJobsPublisher } from '../../services/publisher/jobs-publisher/service.create'
import { initCreateJobsSubscriber } from '../../services/subscriber/jobs-subscriber/service.create.'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'
import { getPipelineSpeaker } from '../../utils/util.speaker'
import { IJobs } from '../../interface/interface.jobs'

export const createJobsController = async (req: Request, res: Response): Promise<void> => {
	const response: IJobs = await getPipelineSpeaker('speaker:companies:to:jobs')
	await setCreateJobsPublisher({ ...response })
	await initCreateJobsSubscriber()
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
