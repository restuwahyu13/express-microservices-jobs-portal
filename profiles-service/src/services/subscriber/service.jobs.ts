import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IJobs } from '../../interface/interface.service'

export const initDeleteJobsSubscriber = async (): Promise<void> => {
	const deleteJobsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IJobs = await deleteJobsSubscriber.getMap('djobs:service')

	try {
		const checkJobsExist: ProfilesDTO[] = await profileSchema
			.find({
				'jobPreferences.jobId': res.jobPreferences.jobsId,
				'$or': [
					{ 'jobPreferences.jobInterests': { $in: [res.jobPreferences.jobInterests] } },
					{ 'jobPreferences.workTypes': { $in: [res.jobPreferences.workTypes] } },
					{ 'jobPreferences.workCityPreferences': { $in: [res.jobPreferences.workCityPreferences] } }
				]
			})
			.lean()

		if (checkJobsExist.length < 1) {
			await setResponsePublisher({
				status: 404,
				message: `value is not exist in jobInterests | workTypes | workCityPreferences, or deleted from owner`
			})
		} else {
			const deleteJobs: any = await profileSchema.updateOne(
				{ 'jobPreferences.jobId': res.jobPreferences.jobsId },
				{
					$pull: {
						'jobPreferences.jobInterests': res.jobPreferences.jobInterests,
						'jobPreferences.workTypes': res.jobPreferences.workTypes,
						'jobPreferences.workCityPreferences': res.jobPreferences.workCityPreferences
					}
				}
			)

			if (!deleteJobs) {
				await setResponsePublisher({
					status: 403,
					message: `deleted job value in jobInterests | workTypes | workCityPreferences failed`
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: `deleted job value in jobInterests | workTypes | workCityPreferences successfully`
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

export const initUpdateJobsSubscriber = async (): Promise<void> => {
	const updateJobsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IJobs = await updateJobsSubscriber.getMap('ujobs:service')

	try {
		const checkJobsExist: ProfilesDTO[] = await profileSchema
			.find({
				'jobPreferences.jobId': res.jobPreferences.jobsId,
				'$or': [
					{ 'jobPreferences.jobInterests': { $in: [...res.jobPreferences.jobInterests] } },
					{ 'jobPreferences.workTypes': { $in: [...res.jobPreferences.workTypes] } },
					{ 'jobPreferences.workCityPreferences': { $in: [...res.jobPreferences.workCityPreferences] } }
				]
			})
			.lean()

		if (checkJobsExist.length > 0) {
			await setResponsePublisher({
				status: 409,
				message: `value already exist in jobInterests | workTypes | workCityPreferences, or deleted from owner`
			})
		} else {
			const updateJobs: any = await profileSchema.updateOne(
				{ 'jobPreferences.jobId': res.jobPreferences.jobsId },
				{
					$set: { 'jobs.salaryExpectation': res.jobPreferences.salaryExpectation },
					$addToSet: {
						'jobPreferences.jobInterests': { $each: [...res.jobPreferences.jobInterests] },
						'jobPreferences.workTypes': { $each: [...res.jobPreferences.workTypes] },
						'jobPreferences.workCityPreferences': { $each: [...res.jobPreferences.workCityPreferences] }
					}
				}
			)

			if (!updateJobs) {
				await setResponsePublisher({
					status: 403,
					message: `updated job value in jobInterests | workTypes | workCityPreferences failed`
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: `updated job value in jobInterests | workTypes | workCityPreferences successfully`
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
