import { Request, Response } from 'express'
import { setUpdateJobsPublisher } from '../../services/publisher/jobs-publisher/service.update'
import { initUpdateMeSubscriber } from '../../services/subscriber/jobs-subscriber/service.update'
import { getResponseSubscriber } from '../../utils/util.message'
import { getPipelineSpeaker } from '../../utils/util.speaker'
import { streamBox } from '../../utils/util.stream'
import { IJobs } from '../../interface/interface.jobs'

export const updateJobsController = async (req: Request, res: Response): Promise<void> => {
	const response: IJobs = await getPipelineSpeaker('speaker:update:companies:to:jobs')
	await setUpdateJobsPublisher({ ...response })
	await initUpdateMeSubscriber()
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
