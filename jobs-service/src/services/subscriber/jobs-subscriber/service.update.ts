import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { jobsSchema } from '../../../models/model.job'
import { JobsDTO } from '../../../dto/dto.job'
import { IJobs } from '../../../interface/interface.jobs'

export const initUpdateJobsSubscriber = async (): Promise<void> => {
	const updateJobsSubscriber = new Subscriber({ key: 'Jobs Update' })
	const res: IJobs = await updateJobsSubscriber.getMap('jobs:update:service')

	try {
		const checkJobsExist: JobsDTO[] = await jobsSchema
			.findOneAndUpdate(
				{ jobId: res.jobsId },
				{
					$set: {
						'jobsVancyLocation': res.jobsVancyLocation,
						'jobsVancySalary': res.jobsVancySalary,
						'jobsVancyPosition': res.jobsVancyPosition,
						'jobsVancyCategory': res.jobsVancyCategory,
						'jobsVancyWorkingTime': res.jobsVancyWorkingTime,
						'jobsVancyExperince.from': res.jobsVancyExperince?.from,
						'jobsVancyExperince.to': res.jobsVancyExperince?.to,
						'jobsVancyStatus': res.jobsVancyStatus,
						'jobsVancyDescription': res.jobsVancyDescription,
						'jobsVancyUsers.$.jobsApplicationStatus': res.jobsVancyUsers?.jobsApplicationStatus,
						'jobsVancyUsers.$.jobsApplicationDescription': res.jobsVancyUsers?.jobsApplicationDescription,
						'createdAt': new Date()
					}
					// $addToSet: {
					// 	jobsVancySkill: res.jobsVancySkill,
					// 	jobsVancyAllowances: res.jobsVancyAllowances,
					// 	jobsVancyAdditionalSkill: res.jobsVancyAdditionalSkill
					// }
				}
			)
			.lean()

		if (!checkJobsExist) {
			await setResponsePublisher({
				status: 404,
				message: `jobs post is not exist for this id ${res.jobsId}, or deleted from owner`
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `updated job post successfully for this id ${res.jobsId}`
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
