import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'

export const initDeleteEducationSubscriber = async (): Promise<void> => {
	const deleteEducationsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const { userId, educationId }: any = await deleteEducationsSubscriber.getMap('deducations:service')

	try {
		const checkEducationExist: ProfilesDTO = await profileSchema.findOne({ 'educations.$.educationId': educationId })

		if (!checkEducationExist) {
			await setResponsePublisher({
				status: 404,
				message: 'education is not exist, or deleted from owner'
			})
		} else {
			const deleteEducations: ProfilesDTO = await profileSchema.updateOne(
				{ userId: userId },
				{ $pull: { educations: educationId } }
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
	const res: ProfilesDTO = await deleteSkillsSubscriber.getMap('ueducations:service')

	try {
		const checkEducationExist: ProfilesDTO = await profileSchema.findOne({ 'educations.$.educationId': res.educationId })

		if (!checkEducationExist) {
			await setResponsePublisher({
				status: 404,
				message: 'skills is not exist, or deleted from owner'
			})
		} else {
			const updateEducations: ProfilesDTO = await profileSchema.updateOne(
				{ userId: res.userId, educationId: res.educationId },
				{
					$set: {
						'educations.$.institutionName': res.educations.institutionName,
						'education.$.educationDegree': res.educations.educationDegree,
						'education.$.fieldStudy': res.educations.fieldStudy,
						'education.$.startDate': res.educations.startDate,
						'education.$.endDate': res.educations.endDate,
						'education.$.educationInformation': res.educations.educationInformation
					}
				}
			)

			if (updateEducations) {
				await setResponsePublisher({
					status: 403,
					message: 'updated educations failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'updated educations successfully'
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
