import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IAppreciations } from '../../interface/interface.service'

export const initDeleteAppreciationsSubscriber = async (): Promise<void> => {
	const deleteAppreciationsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IAppreciations = await deleteAppreciationsSubscriber.getMap('dappreciations:service')

	try {
		const checkAppreciationExist: ProfilesDTO = await profileSchema.findOne({
			'appreciations.appreciationId': res.appreciations.appreciationId
		})

		if (!checkAppreciationExist) {
			await setResponsePublisher(`appreciations:delete:${uuid()}`, {
				status: 404,
				message: `appreciation id ${res.appreciations.appreciationId} is not exist, or deleted from owner`
			})
		} else {
			const deleteAppreciations: ProfilesDTO = await profileSchema.updateOne(
				{ 'appreciations.appreciationId': res.appreciations.appreciationId },
				{ $pull: { appreciations: { appreciationId: res.appreciations.appreciationId } } }
			)

			if (!deleteAppreciations) {
				await setResponsePublisher(`appreciations:delete:${uuid()}`, {
					status: 403,
					message: `deleted appreciation id ${res.appreciations.appreciationId} successfully`
				})
			} else {
				await setResponsePublisher(`appreciations:delete:${uuid()}`, {
					status: 200,
					message: `deleted appreciation id ${res.appreciations.appreciationId} successfully`
				})
			}
		}
	} catch (error) {
		await setResponsePublisher(`appreciations:delete:${uuid()}`, {
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}

export const initUpdateAppreciationsSubscriber = async (): Promise<void> => {
	const deleteEducationsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IAppreciations = await deleteEducationsSubscriber.getMap('uappreciations:service')

	try {
		const checkAppreciationsExist: ProfilesDTO = await profileSchema.findOne({
			'appreciations.appreciationId': res.appreciations.appreciationId
		})

		if (!checkAppreciationsExist) {
			await setResponsePublisher(`appreciations:update:${uuid()}`, {
				status: 404,
				message: `appreciation id ${res.appreciations.appreciationId} is not exist, or deleted from owner`
			})
		} else {
			const updateAppreciations: ProfilesDTO = await profileSchema.updateOne(
				{ 'appreciations.appreciationId': res.appreciations.appreciationId },
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
				await setResponsePublisher(`appreciations:update:${uuid()}`, {
					status: 403,
					message: `updated appreciation id ${res.appreciations.appreciationId} failed`
				})
			} else {
				await setResponsePublisher(`appreciations:update:${uuid()}`, {
					status: 200,
					message: `updated appreciation id ${res.appreciations.appreciationId} successfully`
				})
			}
		}
	} catch (error) {
		await setResponsePublisher(`appreciations:update:${uuid()}`, {
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
