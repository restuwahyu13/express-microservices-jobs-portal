import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IVolunteers } from '../../interface/interface.service'

export const initDeleteEducationSubscriber = async (): Promise<void> => {
	const deleteEducationsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IVolunteers = await deleteEducationsSubscriber.getMap('dvolunteers:service')

	try {
		const checkEducationExist: ProfilesDTO = await profileSchema.findOne({
			'volunteers.$.volunteerId': res.volunteer.volunteerId
		})

		if (!checkEducationExist) {
			await setResponsePublisher({
				status: 404,
				message: 'volunteers is not exist, or deleted from owner'
			})
		} else {
			const deleteEducations: ProfilesDTO = await profileSchema.updateOne(
				{ 'volunteers.$.volunteerId': res.volunteer.volunteerId },
				{ $pull: { 'volunteers.$.volunteerId': res.volunteer.volunteerId } }
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
	const res: IVolunteers = await deleteSkillsSubscriber.getMap('uvolunteers:service')

	try {
		const checkEducationExist: ProfilesDTO = await profileSchema.findOne({
			'volunteers.$.volunteerId': res.volunteer.volunteerId
		})

		if (!checkEducationExist) {
			await setResponsePublisher({
				status: 404,
				message: 'skills is not exist, or deleted from owner'
			})
		} else {
			const updateEducations: ProfilesDTO = await profileSchema.updateOne(
				{ 'volunteers.$.volunteerId': res.volunteer.volunteerId },
				{
					$set: {
						'volunteers.$.organizationName': res.volunteer.organizationName,
						'volunteers.$.organizationPosition': res.volunteer.organizationPosition,
						'volunteers$.startDate': res.volunteer.startDate,
						'volunteers$.endDate': res.volunteer.endDate,
						'volunteers$.organizationInformation': res.volunteer.organizationInformation
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
