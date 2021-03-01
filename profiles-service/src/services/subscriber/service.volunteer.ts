import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'

export const initDeleteEducationSubscriber = async (): Promise<void> => {
	const deleteEducationsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const { userId, volunteerId }: any = await deleteEducationsSubscriber.getMap('dvolunteers:service')

	try {
		const checkEducationExist: ProfilesDTO = await profileSchema.findOne({ 'volunteers.$.volunteerId': volunteerId })

		if (!checkEducationExist) {
			await setResponsePublisher({
				status: 404,
				message: 'volunteers is not exist, or deleted from owner'
			})
		} else {
			const deleteEducations: ProfilesDTO = await profileSchema.updateOne(
				{ userId: userId },
				{ $pull: { volunteers: volunteerId } }
			)

			if (!deleteEducations) {
				await setResponsePublisher({
					status: 403,
					message: 'deleted education failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'deleted education successfully'
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
	const deleteSkillsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: ProfilesDTO = await deleteSkillsSubscriber.getMap('uvolunteers:service')

	try {
		const checkEducationExist: ProfilesDTO = await profileSchema.findOne({ 'volunteers.$.volunteerId': res.volunteerId })

		if (!checkEducationExist) {
			await setResponsePublisher({
				status: 404,
				message: 'skills is not exist, or deleted from owner'
			})
		} else {
			const updateEducations: ProfilesDTO = await profileSchema.updateOne(
				{ userId: res.userId, volunteerId: res.volunteerId },
				{
					$set: {
						'volunteers.$.organizationName': res.educations.institutionName,
						'volunteers.$.organizationPosition': res.educations.educationDegree,
						'volunteers$.startDate': res.educations.fieldStudy,
						'volunteers$.endDate': res.educations.startDate,
						'volunteers$.endDate': res.educations.endDate,
						'volunteers$.educationInformation': res.educations.educationInformation
					}
				}
			)

			if (updateEducations) {
				await setResponsePublisher({
					status: 403,
					message: 'updated volunteers failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'updated volunteers successfully'
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
