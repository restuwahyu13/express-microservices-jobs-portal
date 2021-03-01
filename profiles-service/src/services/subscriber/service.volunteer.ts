import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IVolunteers } from '../../interface/interface.service'

export const initDeleteVolunteersSubscriber = async (): Promise<void> => {
	const deleteVolunteersSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IVolunteers = await deleteVolunteersSubscriber.getMap('dvolunteers:service')

	try {
		const checkVolunteerExist: ProfilesDTO = await profileSchema.findOne({
			'volunteers.$.volunteerId': res.volunteer.volunteerId
		})

		if (!checkVolunteerExist) {
			await setResponsePublisher({
				status: 404,
				message: 'volunteer is not exist, or deleted from owner'
			})
		} else {
			const deleteVolunteer: ProfilesDTO = await profileSchema.updateOne(
				{ 'volunteers.$.volunteerId': res.volunteer.volunteerId },
				{ $pull: { 'volunteers.$.volunteerId': res.volunteer.volunteerId } }
			)

			if (!deleteVolunteer) {
				await setResponsePublisher({
					status: 403,
					message: 'deleted volunteer failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'deleted volunteer successfully'
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

export const initUpdateVolunteersSubscriber = async (): Promise<void> => {
	const updateVolunteerSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IVolunteers = await updateVolunteerSubscriber.getMap('uvolunteers:service')

	try {
		const checkVolunteersExist: ProfilesDTO = await profileSchema.findOne({
			'volunteers.$.volunteerId': res.volunteer.volunteerId
		})

		if (!checkVolunteersExist) {
			await setResponsePublisher({
				status: 404,
				message: 'volunteer is not exist, or deleted from owner'
			})
		} else {
			const updateVolunter: ProfilesDTO = await profileSchema.updateOne(
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

			if (!updateVolunter) {
				await setResponsePublisher({
					status: 403,
					message: 'updated volunteer failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'updated volunteer successfully'
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
