import { Request, Response } from 'express'
import { profileSchema } from '../models/model.profile'
import { cloudStorage, UploadApiResponse } from '../utils/util.cloud'
import {
	initCreateMeSubscriber,
	initCreateSubMeSubscriber,
	initResultMeSubscriber,
	initDeletetMeSubscriber
} from '../services/subscriber/service.me'
import {
	setCreateMePublisher,
	setCreateSubMePublisher,
	setResultMePublisher,
	setDeletetMePublisher
} from '../services/publisher/service.me'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'
import { ProfilesDTO } from '../dto/dto.profile'

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
			user: data
		})
	}
}

export const meDeleteController = async (req: Request, res: Response): Promise<void> => {
	await setDeletetMePublisher({ userId: req.params.userId })
	await initDeletetMeSubscriber()
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
