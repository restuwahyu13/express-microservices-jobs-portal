import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'

export const initCreateJobsSubscriber = async (): Promise<void> => {
	const createJobsSubscriber = new Subscriber({ key: 'Profile' })
	const { id, jobPreferences }: any = await createJobsSubscriber.getMap('cjobs:service')
	const { jobInterests, workType, salaryExpectation, workCityPreferences } = jobPreferences
	try {
		const addVolunteer: ProfilesDTO = await profileSchema.findByIdAndUpdate(
			{ _id: id },
			{
				$set: { salaryExpectation: salaryExpectation },
				$addToSet: {
					'jobPreferences.jobInterests': { $each: jobInterests },
					'jobPreferences.workTypes': { $each: workType },
					'jobPreferences.workCityPreferences': { $each: workCityPreferences }
				}
			}
		)

		if (addVolunteer) {
			await setResponsePublisher({
				status: 403,
				message: 'add new jobPreferences failed, please try again'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: 'add new jobPreferences successfully'
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
