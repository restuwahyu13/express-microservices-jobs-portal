import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { jobsSchema } from '../../../models/model.job'
import { JobsDTO } from '../../../dto/dto.job'
import { IJobs } from '../../../interface/interface.jobs'

export const initCreateJobsSubscriber = async (): Promise<void> => {
	const createJobsSubscriber = new Subscriber({ key: 'Jobs Create' })
	const res: IJobs = await createJobsSubscriber.getMap('jobs:create:service')

	try {
		const checkCompaniesId: JobsDTO[] = await jobsSchema
			.find({ $and: [{ companiesId: res.companiesId }, { jobsVancyPosition: res.jobsVancyPosition }] })
			.lean()

		if (checkCompaniesId.length > 0) {
			await setResponsePublisher({
				status: 409,
				message: `jobs already posted for this position ${res.jobsVancyPosition} by companiesId ${res.companiesId}`
			})
		} else {
			const createJobsPost = await jobsSchema.create({
				companiesId: res.companiesId,
				jobsVancyLocation: res.jobsVancyLocation,
				jobsVancySalary: res.jobsVancySalary,
				jobsVancyPosition: res.jobsVancyPosition,
				jobsVancyCategory: res.jobsVancyCategory,
				jobsVancyWorkingTime: res.jobsVancyWorkingTime,
				jobsVancyExperince: res.jobsVancyExperince,
				jobsVancyStatus: res.jobsVancyStatus,
				jobsVancyDescription: res.jobsVancyDescription,
				jobsVancySkill: res.jobsVancySkill,
				jobsVancyAllowances: res.jobsVancyAllowances,
				jobsVancyAdditionalSkill: res.jobsVancyAdditionalSkill
			})

			if (!createJobsPost) {
				await setResponsePublisher({
					status: 403,
					message: `post new jobs for this id ${res.companiesId} failed`
				})
			} else {
				await setResponsePublisher({
					status: 201,
					message: `post new jobs for this id ${res.companiesId} successfully`
				})
			}
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
