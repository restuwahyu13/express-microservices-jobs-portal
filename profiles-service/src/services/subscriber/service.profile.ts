import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IRequest } from '../../interface/interface.payload'

export const initCreateProfileSubscriber = async (): Promise<void> => {
	const createProfileSubscriber = new Subscriber({ key: 'Profile' })
	const res: IRequest = await createProfileSubscriber.getMap('cprofile:service')
	try {
		const checkUserId: ProfilesDTO = await profileSchema.findById({ userId: res.userId }).lean()
		if (checkUserId) {
			await setResponsePublisher({
				status: 404,
				message: 'userId is not exist for this users, please create new account'
			})
		} else {
			const saveProfile: ProfilesDTO = await profileSchema.create({
				userId: res.userId,
				photo: res.photo,
				birthDate: res.birthDate,
				gender: res.gender,
				status: res.status,
				nationality: res.nationality,
				aboutme: res.aboutme,
				resume: res.resume,
				skills: res.skills,
				workExperience: res.workExperience,
				education: res.education
			})

			if (saveProfile) {
				await setResponsePublisher({
					status: 403,
					message: `add new profile for userId ${checkUserId.userId} failed, please try again`
				})
			} else {
				await setResponsePublisher({
					status: 404,
					message: `add new profile for userId ${checkUserId.userId} successfully`
				})
			}
		}
	} catch (err) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
