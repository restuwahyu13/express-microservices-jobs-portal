import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { ISkills } from '../../interface/interface.service'
import { uniqueId } from '../../utils/util.unique'

export const initDeleteSkillsSubscriber = async (): Promise<void> => {
	const deleteSkillsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const { userId, skills }: ISkills = await deleteSkillsSubscriber.getMap('dskills:service')
	try {
		const checkSkillExist: number = await profileSchema
			.findOne({ skills: { $in: [skills] } })
			.lean()
			.countDocuments()

		if (checkSkillExist < 1) {
			await setResponsePublisher(`skills:${uniqueId()}`, {
				status: 404,
				message: `${skills} is not exist from skills, or deleted from owner`
			})
		} else {
			const deleteSkills: ProfilesDTO = await profileSchema.updateOne({ userId: userId }, { $pull: { skills: skills } })

			if (!deleteSkills) {
				await setResponsePublisher(`skills:${uniqueId()}`, {
					status: 403,
					message: 'deleted one skill failed, please try again'
				})
			} else {
				await setResponsePublisher(`skills:${uniqueId()}`, {
					status: 200,
					message: 'deleted one skill successfully'
				})
			}
		}
	} catch (error) {
		await setResponsePublisher(`skills:${uniqueId()}`, {
			status: 500,
			message: 'internal server error'
		})
	}
}

export const initUpdateSkillsSubscriber = async (): Promise<void> => {
	const updateSkillsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const { userId, skills }: ISkills = await updateSkillsSubscriber.getMap('uskills:service')
	try {
		const checkUserId: number = await profileSchema.findOne({ userId: userId }).lean().countDocuments()

		if (checkUserId < 1) {
			await setResponsePublisher(`skills:${uniqueId()}`, {
				status: 404,
				message: 'users is not exist for this id, or deleted from owner'
			})
		} else {
			const updateSkills: ProfilesDTO = await profileSchema.updateOne(
				{ userId: userId },
				{ $addToSet: { skills: { $each: [...skills] } } }
			)

			if (!updateSkills) {
				await setResponsePublisher(`skills:${uniqueId()}`, {
					status: 403,
					message: 'updated skill failed, please try again'
				})
			} else {
				await setResponsePublisher(`skills:${uniqueId()}`, {
					status: 200,
					message: 'updated skill successfully'
				})
			}
		}
	} catch (error) {
		await setResponsePublisher(`skills:${uniqueId()}`, {
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
