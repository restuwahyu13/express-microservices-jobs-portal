import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'

export const initCreateVolunteersSubscriber = async (): Promise<void> => {
	const createVolunteersSubscriber = new Subscriber({ key: 'Profile' })
	const { id, volunteerExperiences }: any = await createVolunteersSubscriber.getMap('cvolunteers:service')
	try {
		const addVolunteer: ProfilesDTO = await profileSchema.findByIdAndUpdate(
			{ _id: id },
			{ $addToSet: { volunteerExperiences: { $each: volunteerExperiences } } }
		)

		if (addVolunteer) {
			await setResponsePublisher({
				status: 403,
				message: 'add new volunteerExperiences failed, please try again'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: 'add new volunteerExperiences successfully'
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
