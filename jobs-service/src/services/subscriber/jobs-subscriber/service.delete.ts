import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { jobsSchema } from '../../../models/model.job'
import { JobsDTO } from '../../../dto/dto.job'
import { IJobs } from '../../../interface/interface.jobs'

export const initDeleteJobsSubscriber = async (): Promise<void> => {
	const deleteJobsSubscriber = new Subscriber({ key: 'Jobs Delete' })
	const res: IJobs = await deleteJobsSubscriber.getMap('jobs:delete:service')

	try {
		const checkJobsExist: JobsDTO[] = await jobsSchema.findOneAndDelete({ jobId: res.jobsId }).lean()

		if (!checkJobsExist) {
			await setResponsePublisher({
				status: 404,
				message: `jobs post is not exist for this id ${res.jobsId}, or deleted from owner`
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `deleted job post successfully for this id ${res.jobsId}`
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
