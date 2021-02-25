import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'

export const initWorksProfileSubscriber = async (): Promise<void> => {
	const createWorksSubscriber = new Subscriber({ key: 'Profile' })
	const { id, workExperiences }: any = await createWorksSubscriber.getMap('cworks:service')
	try {
		const addWork: ProfilesDTO = await profileSchema.findByIdAndUpdate(
			{ _id: id },
			{ $addToSet: { workExperiences: { $each: workExperiences } } }
		)

		if (addWork) {
			await setResponsePublisher({
				status: 403,
				message: 'add new workExperiences failed, please try again'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: 'add new workExperiences successfully'
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
