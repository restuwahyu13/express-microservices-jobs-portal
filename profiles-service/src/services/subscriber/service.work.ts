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
			'works.$.workId': res.works.workId
		})

		if (!checkWorkExist) {
			await setResponsePublisher({
				status: 404,
				message: 'work is not exist, or deleted from owner'
			})
		} else {
			const deleteWorks: ProfilesDTO = await profileSchema.updateOne(
				{ 'works.$.workId': res.works.workId },
				{ $pull: { 'works.$.workId': res.works.workId } }
			)

			if (!deleteWorks) {
				await setResponsePublisher({
					status: 403,
					message: 'deleted work failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'deleted work successfully'
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

export const initUpdateWorksSubscriber = async (): Promise<void> => {
	const updateWorksSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IWorks = await updateWorksSubscriber.getMap('uworks:service')

	try {
		const checkWorkExist: ProfilesDTO = await profileSchema.findOne({
			'works.$.educationId': res.works.workId
		})

		if (!checkWorkExist) {
			await setResponsePublisher({
				status: 404,
				message: 'works is not exist, or deleted from owner'
			})
		} else {
			const updateWorks: ProfilesDTO = await profileSchema.updateOne(
				{ 'works.$.workId': res.works.workId },
				{
					$set: {
						'works.$.companyName': res.works.companyName,
						'works.$.jobPosition': res.works.jobPosition,
						'works.$.startDate': res.works.startDate,
						'works.$.endDate': res.works.endDate,
						'works.$.workInformation': res.works.workInformation
					}
				}
			)

			if (!updateWorks) {
				await setResponsePublisher({
					status: 403,
					message: 'updated work failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'updated work successfully'
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
