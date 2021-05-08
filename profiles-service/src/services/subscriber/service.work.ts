import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IWorks } from '../../interface/interface.service'

export const initDeleteWorksSubscriber = async (): Promise<void> => {
	const deleteWorksSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IWorks = await deleteWorksSubscriber.getMap('dworks:service')

	try {
		const checkWorkExist: ProfilesDTO = await profileSchema.findOne({
			'workExperiences.workId': res.works.workId
		})

		if (!checkWorkExist) {
			await setResponsePublisher({
				status: 404,
				message: `work id ${res.works.workId} is not exist, or deleted from owner`
			})
		} else {
			const deleteWorks: any = await profileSchema.updateOne(
				{ 'workExperiences.workId': res.works.workId },
				{ $pull: { workExperiences: { workId: res.works.workId } } }
			)

			if (!deleteWorks) {
				await setResponsePublisher({
					status: 403,
					message: `deleted work id ${res.works.workId} failed`
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: `deleted work id ${res.works.workId} successfully`
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

export const initUpdateWorksSubscriber = async (): Promise<void> => {
	const updateWorksSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IWorks = await updateWorksSubscriber.getMap('uworks:service')

	try {
		const checkWorkExist: ProfilesDTO = await profileSchema.findOne({
			'workExperiences.workId': res.works.workId
		})

		if (!checkWorkExist) {
			await setResponsePublisher({
				status: 404,
				message: `work id ${res.works.workId} is not exist, or deleted from owner`
			})
		} else {
			const updateWorks: any = await profileSchema.updateOne(
				{ 'workExperiences.workId': res.works.workId },
				{
					$set: {
						'workExperiences.$.companyName': res.works.companyName,
						'workExperiences.$.jobPosition': res.works.jobPosition,
						'workExperiences.$.startDate': res.works.startDate,
						'workExperiences.$.endDate': res.works.endDate,
						'workExperiences.$.workInformation': res.works.workInformation
					}
				}
			)

			if (!updateWorks) {
				await setResponsePublisher({
					status: 403,
					message: `updated work id ${res.works.workId} failed`
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: `updated work id ${res.works.workId} successfully`
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
