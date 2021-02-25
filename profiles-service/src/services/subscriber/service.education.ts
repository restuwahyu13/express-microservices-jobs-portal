import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'

export const initEducationsProfileSubscriber = async (): Promise<void> => {
	const createEducationsSubscriber = new Subscriber({ key: 'Profile' })
	const { id, educations }: any = await createEducationsSubscriber.getMap('ceducations:service')
	try {
		const addVolunteer: ProfilesDTO = await profileSchema.findByIdAndUpdate(
			{ _id: id },
			{ $addToSet: { educations: { $each: educations } } }
		)

		if (addVolunteer) {
			await setResponsePublisher({
				status: 403,
				message: 'add new education failed, please try again'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: 'add new education successfully'
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
