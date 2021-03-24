import { Request, Response } from 'express'
import { setDeleteJobsPublisher } from '../../services/publisher/jobs-publisher/service.delete'
import { initDeleteJobsSubscriber } from '../../services/subscriber/jobs-subscriber/service.delete'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'
import { getPipelineSpeaker } from '../../utils/util.speaker'
import { IJobs } from '../../interface/interface.jobs'

export const deleteJobsController = async (req: Request, res: Response): Promise<void> => {
	const response: IJobs = await getPipelineSpeaker('speaker:delete:companies:to:jobs')
	await setDeleteJobsPublisher({ ...response })
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
