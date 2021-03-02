import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IAppreciations } from '../../interface/interface.service'

export const initDeleteEducationSubscriber = async (): Promise<void> => {
	const deleteEducationsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IAppreciations = await deleteEducationsSubscriber.getMap('deducations:service')

	try {
		const checkEducationExist: ProfilesDTO = await profileSchema.findOne({
			'appreciations.$.appreciationId': res.appreciations.appreciationId
		})

		if (!checkEducationExist) {
			await setResponsePublisher({
				status: 404,
				message: 'education is not exist, or deleted from owner'
			})
		} else {
			const deleteEducations: ProfilesDTO = await profileSchema.updateOne(
				{ 'appreciations.$.appreciationId': res.appreciations.appreciationId },
				{ $pull: { 'educations.$.appreciationId': res.appreciations.appreciationId } }
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
			message: `internal server error: ${error}`
		})
	}
}

export const initUpdateEducationsSubscriber = async (): Promise<void> => {
	const deleteEducationsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IAppreciations = await deleteEducationsSubscriber.getMap('ueducations:service')

	try {
		const checkAppreciationsExist: ProfilesDTO = await profileSchema.findOne({
			'appreciations.$.appreciationId': res.appreciations.appreciationId
		})

		if (!checkAppreciationsExist) {
			await setResponsePublisher({
				status: 404,
				message: 'appreciation is not exist, or deleted from owner'
			})
		} else {
			const updateAppreciations: ProfilesDTO = await profileSchema.updateOne(
				{ 'appreciations.$.appreciationId': res.appreciations.appreciationId },
				{
					$set: {
						'appreciations.$.awardTitle': res.appreciations.awardTitle,
						'appreciations.$.achievementTitle': res.appreciations.achievementTitle,
						'appreciations.$.awardYear': res.appreciations.awardYear,
						'appreciations.$.awardInformation': res.appreciations.awardInformation
					}
				}
			)

			if (!updateAppreciations) {
				await setResponsePublisher({
					status: 403,
					message: 'updated appreciation failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'updated appreciation successfully'
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
