import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { ISkills } from '../../interface/interface.service'

export const initDeleteSkillsSubscriber = async (): Promise<void> => {
	const deleteSkillsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const { userId, skills }: ISkills = await deleteSkillsSubscriber.getMap('dskills:service')
	try {
		const checkSkillExist: number = await profileSchema.findOne({ skills: { $in: [skills] } }).count()

		if (checkSkillExist < 1) {
			await setResponsePublisher({
				status: 404,
				message: 'skills is not exist, or deleted from owner'
			})
		} else {
			const deleteSkills: ProfilesDTO = await profileSchema.updateOne({ userId: userId }, { $pull: { skills: skills } })

			if (!deleteSkills) {
				await setResponsePublisher({
					status: 403,
					message: 'deleted skills failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'deleted skills successfully'
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

export const initUpdateSkillsSubscriber = async (): Promise<void> => {
	const updateSkillsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const { userId, skills }: ISkills = await updateSkillsSubscriber.getMap('uskills:service')
	try {
		const checkSkillExist: number = await profileSchema.findOne({ skills: { $in: [...skills] } }).count()

		if (checkSkillExist < 1) {
			await setResponsePublisher({
				status: 404,
				message: 'skills is not exist, or deleted from owner'
			})
		} else {
			const updateSkills: ProfilesDTO = await profileSchema.updateOne(
				{ userId: userId },
				{ $addToset: { skills: { $each: [...skills] } } }
			)

			if (!updateSkills) {
				await setResponsePublisher({
					status: 403,
					message: 'updated skills failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'updated skills successfully'
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
