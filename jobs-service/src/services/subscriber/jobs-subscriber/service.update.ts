import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IRequest } from '../../interface/interface.payload'

export const initCreateMeSubscriber = async (): Promise<void> => {
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
			await setResponsePublisher({
				status: 200,
				message: 'add new profile successfully'
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}

export const initCreateSubMeSubscriber = async (): Promise<void> => {
	const createSubProfileSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IRequest = await createSubProfileSubscriber.getMap('csubprofile:service')
	const { jobInterests, workTypes, salaryExpectation, workCityPreferences } = res.jobPreferences
	const {
		facebook,
		twitter,
		instagram,
		linkedIn,
		behance,
		dribbble,
		github,
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
					'jobPreferences.salaryExpectation': salaryExpectation,
					'socialNetworks.facebook': facebook,
					'socialNetworks.twitter': twitter,
					'socialNetworks.instagram': instagram,
					'socialNetworks.linkedIn': linkedIn,
					'socialNetworks.behance': behance,
					'socialNetworks.dribbble': dribbble,
					'socialNetworks.github': github,
					'socialNetworks.codepen': codepen,
					'socialNetworks.vimeo': vimeo,
					'socialNetworks.youtube': youtube,
					'socialNetworks.pinterest': pinterest,
					'socialNetworks.website': website
				},
				$addToSet: {
					'jobPreferences.jobInterests': { $each: [...jobInterests] },
					'jobPreferences.workTypes': { $each: [...workTypes] },
					'jobPreferences.workCityPreferences': { $each: [...workCityPreferences] },
					'skills': { $each: res.skills },
					'educations': { $each: res.educations },
					'volunteerExperiences': { $each: res.volunteerExperiences },
					'workExperiences': { $each: res.workExperiences },
					'appreciations': { $each: res.appreciations }
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
			message: `internal server error: ${error}`
		})
	}
}

export const initResultMeSubscriber = async (): Promise<void> => {
	const resultProfileSubscriber = new Subscriber({ key: 'Profile' })
	const { userId }: IRequest = await resultProfileSubscriber.getMap('rprofile:service')

	try {
		const checkUserId: ProfilesDTO = await profileSchema.findOne({ userId: userId }).lean()

		if (!checkUserId) {
			await setResponsePublisher({
				status: 404,
				message: `user profile is not exist for this id ${userId}, data not already to use`
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `user profile for this id ${userId} exist, data already to use`,
				data: checkUserId
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}

export const initDeleteMeSubscriber = async (): Promise<void> => {
	const resultProfileSubscriber = new Subscriber({ key: 'Profile' })
	const res: IRequest = await resultProfileSubscriber.getMap('dprofile:service')

	try {
		const checkAndDelete: ProfilesDTO = await profileSchema.findOneAndDelete({ userId: res.userId }).lean()

		if (!checkAndDelete) {
			await setResponsePublisher({
				status: 404,
				message: `user profile for this id ${res.userId} is not exist, or deleted from owner`
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `deleted user profile for this id ${res.userId} successfully`
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}

export const initUpdateMeSubscriber = async (): Promise<void> => {
	const resultProfileSubscriber = new Subscriber({ key: 'Profile' })
	const res: IRequest = await resultProfileSubscriber.getMap('uprofile:service')

	try {
		const checkAndUpdate: ProfilesDTO = await profileSchema
			.findOneAndUpdate(
				{ userId: res.userId },
				{
					$set: {
						photo: res.photo,
						gender: res.gender,
						birthDate: res.birthDate,
						status: res.status,
						nationality: res.nationality,
						aboutme: res.aboutme,
						resume: res.resume,
						socialNetworks: {
							facebook: res.socialNetworks.facebook,
							twitter: res.socialNetworks.twitter,
							instagram: res.socialNetworks.instagram,
							linkedIn: res.socialNetworks.linkedIn,
							behance: res.socialNetworks.behance,
							dribbble: res.socialNetworks.dribbble,
							github: res.socialNetworks.github,
							codepen: res.socialNetworks.codepen,
							vimeo: res.socialNetworks.vimeo,
							youtube: res.socialNetworks.youtube,
							pinterest: res.socialNetworks.pinterest,
							website: res.socialNetworks.website
						}
					}
				}
			)
			.lean()

		if (!checkAndUpdate) {
			await setResponsePublisher({
				status: 404,
				message: `user profile for this id ${res.userId} is not exist, or deleted from owner`
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `updated user profile for this id ${res.userId} successfully`
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
