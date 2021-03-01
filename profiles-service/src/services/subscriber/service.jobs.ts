import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IJobs } from '../../interface/interface.service'

export const initDeleteJobsSubscriber = async (): Promise<void> => {
	const deleteJobsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IJobs = await deleteJobsSubscriber.getMap('djobs:service')

	try {
		const checkJobsExist: ProfilesDTO = await profileSchema.findOne({
			'jobPreferences.jobsId': res.jobPreferences.jobsId
		})

		if (!checkJobsExist) {
			await setResponsePublisher({
				status: 404,
				message: 'jobs is not exist, or deleted from owner'
			})
		} else {
			const deleteJobs: ProfilesDTO = await profileSchema.deleteOne({
				'jobPreferences.jobsId': res.jobPreferences.jobsId
			})

			if (!deleteJobs) {
				await setResponsePublisher({
					status: 403,
					message: 'deleted jobs failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'deleted jobs successfully'
				})
			}
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}

export const initUpdateEducationsSubscriber = async (): Promise<void> => {
	const updateJobsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IJobs = await updateJobsSubscriber.getMap('djobs:service')

	try {
		const checkJobsExist: ProfilesDTO = await profileSchema.findOne({
			'jobPreferences.jobsId': res.jobPreferences.jobsId
		})

		if (!checkJobsExist) {
			await setResponsePublisher({
				status: 404,
				message: 'jobs is not exist, or deleted from owner'
			})
		} else {
			const updateJobs: ProfilesDTO = await profileSchema.updateOne(
				{ 'jobPreferences.jobsId': res.jobPreferences.jobsId },
				{
					$set: { 'jobs.salaryExpectation': res.jobPreferences.salaryExpectation },
					$addToSet: {
						'jobs.$.jobInterests': { $each: [...res.jobPreferences.jobInterests] },
						'jobs.$.workTypes': { $each: [...res.jobPreferences.workTypes] },
						'jobs.$.workCityPreferences': { $each: [...res.jobPreferences.workCityPreferences] }
					}
				}
			)

			if (!updateJobs) {
				await setResponsePublisher({
					status: 403,
					message: 'updated jobs failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'updated jobs successfully'
				})
			}
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
