import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { uniqueId } from '../../utils/util.unique'
import { IEducations } from '../../interface/interface.service'

export const initDeleteEducationSubscriber = async (): Promise<void> => {
	const deleteEducationsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IEducations = await deleteEducationsSubscriber.getMap('deducations:service')

	try {
		const checkEducationExist: ProfilesDTO = await profileSchema.findOne({
			'educations.$.educationId': res.educations.educationId
		})

		if (!checkEducationExist) {
			await setResponsePublisher(`education:${uniqueId()}`, {
				status: 404,
				message: 'education is not exist, or deleted from owner'
			})
		} else {
			const deleteEducations: ProfilesDTO = await profileSchema.updateOne(
				{ 'educations.$.educationId': res.educations.educationId },
				{ $pull: { 'educations.$.educationId': res.educations.educationId } }
			)

			if (!deleteEducations) {
				await setResponsePublisher(`education:${uniqueId()}`, {
					status: 403,
					message: 'deleted education failed, please try again'
				})
			} else {
				await setResponsePublisher(`education:${uniqueId()}`, {
					status: 200,
					message: 'deleted education successfully'
				})
			}
		}
	} catch (error) {
		await setResponsePublisher(`education:${uniqueId()}`, {
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}

export const initUpdateEducationsSubscriber = async (): Promise<void> => {
	const deleteEducationsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IEducations = await deleteEducationsSubscriber.getMap('ueducations:service')

	try {
		const checkEducationExist: ProfilesDTO = await profileSchema.findOne({
			'educations.$.educationId': res.educations.educationId
		})

		if (!checkEducationExist) {
			await setResponsePublisher(`education:${uniqueId()}`, {
				status: 404,
				message: 'education is not exist, or deleted from owner'
			})
		} else {
			const updateEducations: ProfilesDTO = await profileSchema.updateOne(
				{ 'educations.$.educationId': res.educations.educationId },
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

			if (!updateEducations) {
				await setResponsePublisher(`education:${uniqueId()}`, {
					status: 403,
					message: 'updated education failed, please try again'
				})
			} else {
				await setResponsePublisher(`education:${uniqueId()}`, {
					status: 200,
					message: 'updated education successfully'
				})
			}
		}
	} catch (error) {
		await setResponsePublisher(`education:${uniqueId()}`, {
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
