import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { ISkills } from '../../interface/interface.service'

export const initDeleteSkillsSubscriber = async (): Promise<void> => {
	const deleteSkillsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const { userId, skills }: ISkills = await deleteSkillsSubscriber.getMap('dskills:service')
	try {
		const checkSkillExist: ProfilesDTO[] = await profileSchema
			.find({ userId: userId, $or: [{ skills: { $in: [skills] } }] })
			.lean()

		if (checkSkillExist.length < 1) {
			await setResponsePublisher({
				status: 404,
				message: `value skills ${skills} is not exist, or deleted from owner`
			})
		} else {
			const deleteSkills: ProfilesDTO = await profileSchema.updateOne({ userId: userId }, { $pull: { skills: skills } })

			if (!deleteSkills) {
				await setResponsePublisher({
					status: 403,
					message: `deleted skill id ${userId} failed`
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: `deleted skill id ${userId} successfully`
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
		const checkSkillExist: ProfilesDTO[] = await profileSchema
			.find({ userId: userId, $or: [{ skills: { $in: [...skills] } }] })
			.lean()

		if (checkSkillExist.length > 0) {
			await setResponsePublisher({
				status: 404,
				message: `value skills ${skills} already exist, or deleted from owner`
			})
		} else {
			const updateSkills: ProfilesDTO = await profileSchema.updateOne(
				{ userId: userId },
				{ $addToSet: { skills: { $each: [...skills] } } }
			)

			if (!updateSkills) {
				await setResponsePublisher({
					status: 403,
					message: `updated skill id ${userId} failed`
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: `updated skill id ${userId} successfully`
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
