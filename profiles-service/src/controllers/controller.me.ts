import { Request, Response } from 'express'
import { profileSchema } from '../models/model.profile'
import { cloudStorage, UploadApiResponse } from '../utils/util.cloud'
import {
	initCreateMeSubscriber,
	initCreateSubMeSubscriber,
	initResultMeSubscriber,
	initDeleteMeSubscriber,
	initUpdateMeSubscriber
} from '../services/subscriber/service.me'
import {
	setCreateMePublisher,
	setCreateSubMePublisher,
	setResultMePublisher,
	setDeletetMePublisher,
	setUpdateMePublisher
} from '../services/publisher/service.me'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'
import { initHttpClient } from '../utils/util.http'
import { ProfilesDTO } from '../dto/dto.profile'
import { setStoreCache, getStoreCache } from '../utils/util.cache'

export const meCreateController = async (req: Request, res: Response): Promise<void> => {
	const checkUserId: ProfilesDTO = await profileSchema.findOne({ userId: req.params.userId }).lean()

	if (checkUserId) {
		await setCreateSubMePublisher({
			userId: checkUserId.userId,
			skills: req.body.skills,
			workExperiences: req.body.workExperiences,
			educations: req.body.educations,
			jobPreferences: req.body.jobPreferences,
			socialNetworks: req.body.socialNetworks,
			appreciations: req.body.appreciations,
			volunteerExperiences: req.body.volunteerExperiences
		})
		await initCreateSubMeSubscriber()
		const { status, message } = await getResponseSubscriber()

		if (status >= 400) {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		} else {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		}
	} else {
		const urls: UploadApiResponse[] = []
		const image: any = req.files['image']
		const document: any = req.files['document']
		const files: Array<Record<string, any>> = image.concat(document)

		for (let file of files) {
			try {
				const response = (await cloudStorage(file.path)) as UploadApiResponse
				urls.push(response)
			} catch (error) {
				throw new Error(error)
			}
		}

		await setCreateMePublisher({
			userId: req.params.userId,
			photo: urls[0].secure_url,
			birthDate: req.body.birthDate,
			gender: req.body.gender,
			status: req.body.status,
			nationality: req.body.nationality,
			aboutme: req.body.aboutme,
			resume: urls[1].secure_url,
			skills: req.body.skills,
			workExperiences: req.body.workExperiences,
			educations: req.body.educations
		})
		await initCreateMeSubscriber()
		const { status, message } = await getResponseSubscriber()

		if (status >= 400) {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		} else {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		}
	}
}

export const meResultController = async (req: Request, res: Response): Promise<void> => {
	await setStoreCache('fromProfile:result', { userId: req.params.userId })
	await initHttpClient('http://localhost:3003/api/v1/users/rprofile', { headers: { 'Content-Type': 'application/json' } })
	const users = await getStoreCache('toProfile:result')

	await setResultMePublisher({ userId: req.params.userId })
	await initResultMeSubscriber()
	const { status, message, data } = await getResponseSubscriber()

	if (status >= 400) {
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	} else {
		streamBox(res, status, {
			method: req.method,
			status,
			message,
			profile: Object.assign(data, users)
		})
	}
}

export const meDeleteController = async (req: Request, res: Response): Promise<void> => {
	await setDeletetMePublisher({ userId: req.params.userId })
	await initDeleteMeSubscriber()
	const { status, message } = await getResponseSubscriber()

	if (status >= 400) {
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	} else {
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	}
}

export const meUpdateController = async (req: Request, res: Response): Promise<void> => {
	const urls: UploadApiResponse[] = []
	const image: any = req.files['image']
	const document: any = req.files['document']
	const files: Array<Record<string, any>> = image.concat(document)

	for (let file of files) {
		try {
			const response = (await cloudStorage(file.path)) as UploadApiResponse
			urls.push(response)
		} catch (error) {
			throw new Error(error)
		}
	}

	await setStoreCache('fromProfile:update', {
		userId: req.params.userId,
		firstName: req.body.firstName,
		lastName: req.body.lastLogin,
		email: req.body.email,
		location: req.body.location,
		phone: req.body.phone
	})
	await initHttpClient('http://localhost:3003/api/v1/users/uprofile', { headers: { 'Content-Type': 'application/json' } })
	await setUpdateMePublisher({
		userId: req.params.userId,
		photo: urls[0].secure_url,
		gender: req.body.gender,
		birthDate: req.body.birtDate,
		status: req.body.status,
		nationality: req.body.nationality,
		aboutMe: req.body.aboutMe,
		resume: urls[1].secure_url,
		socialNetworks: req.body.socialNetwork
	})
	await initUpdateMeSubscriber()
	const { status, message } = await getResponseSubscriber()

	if (status >= 400) {
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	} else {
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	}
}
