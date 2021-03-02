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
			'volunteers.$.volunteerId': res.volunteers.volunteerId
		})

		if (!checkVolunteerExist) {
			await setResponsePublisher({
				status: 404,
				message: 'volunteer is not exist, or deleted from owner'
			})
		} else {
			const deleteVolunteer: ProfilesDTO = await profileSchema.updateOne(
				{ 'volunteers.$.volunteerId': res.volunteers.volunteerId },
				{ $pull: { 'volunteers.$.volunteerId': res.volunteers.volunteerId } }
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
			message: `internal server error: ${error}`
		})
	}
}

export const initUpdateVolunteersSubscriber = async (): Promise<void> => {
	const updateVolunteerSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IVolunteers = await updateVolunteerSubscriber.getMap('uvolunteers:service')

	try {
		const checkVolunteersExist: ProfilesDTO = await profileSchema.findOne({
			'volunteers.$.volunteerId': res.volunteers.volunteerId
		})

		if (!checkVolunteersExist) {
			await setResponsePublisher({
				status: 404,
				message: 'volunteer is not exist, or deleted from owner'
			})
		} else {
			const updateVolunter: ProfilesDTO = await profileSchema.updateOne(
				{ 'volunteers.$.volunteerId': res.volunteers.volunteerId },
				{
					$set: {
						'volunteers.$.organizationName': res.volunteers.organizationName,
						'volunteers.$.organizationPosition': res.volunteers.organizationPosition,
						'volunteers$.startDate': res.volunteers.startDate,
						'volunteers$.endDate': res.volunteers.endDate,
						'volunteers$.organizationInformation': res.volunteers.organizationInformation
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
			message: `internal server error: ${error}`
		})
	}
}
