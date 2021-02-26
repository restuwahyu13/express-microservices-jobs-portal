import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IRequest } from '../../interface/interface.payload'

export const initCreateProfileSubscriber = async (): Promise<void> => {
	const createProfileSubscriber = new Subscriber({ key: 'Profile' })
	const res: IRequest = await createProfileSubscriber.getMap('cprofile:service')
	const response: IRequest = await createProfileSubscriber.getMap('csubprofile:service')
	const { jobInterests, workType, salaryExpectation, workCityPreferences } = response.jobPreferences
	const {
		facebook,
		twitter,
		instagram,
		linkedIn,
		behance,
		dribbble,
		gitHub,
		codepen,
		vimeo,
		youtube,
		pinterest,
		website
	} = response.socialNetworks

	try {
		const checkUserId: ProfilesDTO = await profileSchema.findOne({ userId: response.userId }).lean()
		if (checkUserId) {
			const addNewProfile: ProfilesDTO = await profileSchema.findByIdAndUpdate(
				{ _id: checkUserId._id },
				{
					$set: {
						'salaryExpectation': salaryExpectation,
						'socialNetworks.facebook': facebook,
						'socialNetworks.twitter': twitter,
						'socialNetworks.instagram': instagram,
						'socialNetworks.linkedIn': linkedIn,
						'socialNetworks.behance': behance,
						'socialNetworks.dribbble': dribbble,
						'socialNetworks.gitHub': gitHub,
						'socialNetworks.codepen': codepen,
						'socialNetworks.vimeo': vimeo,
						'socialNetworks.youtube': youtube,
						'socialNetworks.pinterest': pinterest,
						'socialNetworks.website': website
					},
					$addToSet: {
						'educations': { $each: response.educations },
						'jobPreferences.jobInterests': { $each: jobInterests },
						'jobPreferences.workTypes': { $each: workType },
						'jobPreferences.workCityPreferences': { $each: workCityPreferences },
						'skills': { $each: response.skills },
						'volunteerExperiences': { $each: response.volunteerExperiences },
						'workExperience': { $each: response.workExperiences }
					}
				}
			)

			if (!addNewProfile) {
				await setResponsePublisher({
					status: 403,
					message: 'add new profile failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'add new profile successfully'
				})
			}
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
				workExperiences: res.workExperiences,
				educations: res.educations
			})

			if (!saveProfile) {
				await setResponsePublisher({
					status: 403,
					message: 'add new profile failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'add new profile successfully'
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
