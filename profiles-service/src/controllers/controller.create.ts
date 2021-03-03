import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { profileSchema } from '../models/model.profile'
import { cloudStorage, UploadApiResponse } from '../utils/util.cloud'
import { initCreateProfileSubscriber, initCreateSubProfileSubscriber } from '../services/subscriber/service.profile'
import { setCreateProfilePublisher, setCreateSubProfilePublisher } from '../services/publisher/service.profile'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'
import { ProfilesDTO } from '../dto/dto.profile'

export const createController = async (req: Request, res: Response): Promise<void> => {
	const checkUserId: ProfilesDTO = await profileSchema.findOne({ userId: req.params.userId }).lean()

	if (checkUserId) {
		await setCreateSubProfilePublisher({
			userId: checkUserId.userId,
			skills: req.body.skills,
			workExperiences: req.body.workExperiences,
			educations: req.body.educations,
			jobPreferences: req.body.jobPreferences,
			socialNetworks: req.body.socialNetworks,
			appreciations: req.body.appreciations,
			volunteerExperiences: req.body.volunteerExperiences
		})
		await initCreateSubProfileSubscriber()
		const { status, message } = await getResponseSubscriber(`me:${uuid()}`)

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

		await setCreateProfilePublisher({
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
		await initCreateProfileSubscriber()
		const { status, message } = await getResponseSubscriber(`me:${uuid()}`)

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
