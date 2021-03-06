import { v4 as uuid } from 'uuid'
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
			'volunteerExperiences.volunteerId': res.volunteers.volunteerId
		})

		if (!checkVolunteerExist) {
			await setResponsePublisher({
				status: 404,
				message: `volunteer id ${res.volunteers.volunteerId} is not exist, or deleted from owner`
			})
		} else {
			const deleteVolunteer: any = await profileSchema.updateOne(
				{ 'volunteerExperiences.volunteerId': res.volunteers.volunteerId },
				{ $pull: { volunteerExperiences: { volunteerId: res.volunteers.volunteerId } } }
			)

			if (!deleteVolunteer) {
				await setResponsePublisher({
					status: 403,
					message: `deleted volunteer id ${res.volunteers.volunteerId} failed`
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: `deleted volunteer id ${res.volunteers.volunteerId} successfully`
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
			'volunteerExperiences.volunteerId': res.volunteers.volunteerId
		})

		if (!checkVolunteersExist) {
			await setResponsePublisher({
				status: 404,
				message: `volunteer id ${res.volunteers.volunteerId} is not exist, or deleted from owner`
			})
		} else {
			const updateVolunter: any = await profileSchema.updateOne(
				{ 'volunteerExperiences.volunteerId': res.volunteers.volunteerId },
				{
					$set: {
						'volunteerExperiences.$.organizationName': res.volunteers.organizationName,
						'volunteerExperiences.$.organizationPosition': res.volunteers.organizationPosition,
						'volunteerExperiences.$.startDate': res.volunteers.startDate,
						'volunteerExperiences.$.endDate': res.volunteers.endDate,
						'volunteerExperiences.$.organizationInformation': res.volunteers.organizationInformation
					}
				}
			)

			if (!updateVolunter) {
				await setResponsePublisher({
					status: 403,
					message: `updated volunteer id ${res.volunteers.volunteerId} failed`
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: `updated volunteer id ${res.volunteers.volunteerId} successfully`
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
