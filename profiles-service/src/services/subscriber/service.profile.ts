import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IRequest } from '../../interface/interface.payload'

export const initCreateProfileSubscriber = async (): Promise<void> => {
	const createProfileSubscriber = new Subscriber({ key: 'Profile' })
	const res: IRequest = await createProfileSubscriber.getMap('cprofile:service')

	try {
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
			console.log(res)
			await setResponsePublisher({
				status: 200,
				message: 'add new profile successfully'
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}

export const initCreateSubProfileSubscriber = async (): Promise<void> => {
	const createSubProfileSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IRequest = await createSubProfileSubscriber.getMap('csubprofile:service')
	const { jobInterests, workType, salaryExpectation, workCityPreferences } = res.jobPreferences
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
	} = res.socialNetworks

	try {
		const getUserId: ProfilesDTO = await profileSchema.findOne({ userId: res.userId }).lean()
		const addSubProfile: ProfilesDTO = await profileSchema.updateOne(
			{ _id: getUserId._id },
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
				$push: {
					'jobPreferences.jobInterests': { $each: jobInterests },
					'jobPreferences.workTypes': { $each: workType },
					'jobPreferences.workCityPreferences': { $each: workCityPreferences }
				},
				$addToSet: {
					skills: { $each: res.skills },
					educations: { $each: res.educations },
					volunteerExperiences: { $each: res.volunteerExperiences },
					workExperiences: { $each: res.workExperiences },
					appreciations: { $each: res.appreciations }
				}
			}
		)

		if (!addSubProfile) {
			await setResponsePublisher({
				status: 403,
				message: 'add new sub profile failed, please try again'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: 'add new sub profile successfully'
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
