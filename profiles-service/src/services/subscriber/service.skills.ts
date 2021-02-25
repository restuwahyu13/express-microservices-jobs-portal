import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'

export const initSkillsProfileSubscriber = async (): Promise<void> => {
	const createSkillsSubscriber = new Subscriber({ key: 'Profile' })
	const { id, skills }: any = await createSkillsSubscriber.getMap('cskills:service')
	try {
		const addSkills: ProfilesDTO = await profileSchema.findByIdAndUpdate(
			{ _id: id },
			{ $addToset: { skills: { $each: skills } } }
		)

		if (addSkills) {
			await setResponsePublisher({
				status: 403,
				message: 'add new skill failed, please try again'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: 'add new skill successfully'
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
