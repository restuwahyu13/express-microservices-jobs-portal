import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IEducations } from '../../interface/interface.service'

export const initDeleteEducationSubscriber = async (): Promise<void> => {
	const deleteEducationsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IEducations = await deleteEducationsSubscriber.getMap('deducations:service')

	try {
		const checkEducationExist: ProfilesDTO = await profileSchema.findOne({
			'educations.educationId': res.educations.educationId
		})

		if (!checkEducationExist) {
			await setResponsePublisher(`educations:delete:${uuid()}`, {
				status: 404,
				message: `education id ${res.educations.educationId} is not exist, or deleted from owner`
			})
		} else {
			const deleteEducations: ProfilesDTO = await profileSchema.updateOne(
				{ 'educations.educationId': res.educations.educationId },
				{ $pull: { educations: { educationId: res.educations.educationId } } }
			)

			if (!deleteEducations) {
				await setResponsePublisher(`educations:delete:${uuid()}`, {
					status: 403,
					message: `deleted education id ${res.educations.educationId} failed`
				})
			} else {
				await setResponsePublisher(`educations:delete:${uuid()}`, {
					status: 200,
					message: `deleted education id ${res.educations.educationId} successfully`
				})
			}
		}
	} catch (error) {
		await setResponsePublisher(`educations:delete:${uuid()}`, {
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
			'educations.educationId': res.educations.educationId
		})

		if (!checkEducationExist) {
			await setResponsePublisher(`educations:update:${uuid()}`, {
				status: 404,
				message: `education id ${res.educations.educationId} is not exist, or deleted from owner`
			})
		} else {
			const updateEducations: ProfilesDTO = await profileSchema.updateOne(
				{ 'educations.educationId': res.educations.educationId },
				{
					$set: {
						'educations.$.institutionName': res.educations.institutionName,
						'educations.$.educationDegree': res.educations.educationDegree,
						'educations.$.fieldStudy': res.educations.fieldStudy,
						'educations.$.startDate': res.educations.startDate,
						'educations.$.endDate': res.educations.endDate,
						'educations.$.educationInformation': res.educations.educationInformation
					}
				}
			)

			if (!updateEducations) {
				await setResponsePublisher(`educations:update:${uuid()}`, {
					status: 403,
					message: `updated education id ${res.educations.educationId} failed`
				})
			} else {
				await setResponsePublisher(`education:update:${uuid()}`, {
					status: 200,
					message: `updated education id ${res.educations.educationId} successfully`
				})
			}
		}
	} catch (error) {
		await setResponsePublisher(`educations:update:${uuid()}`, {
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
