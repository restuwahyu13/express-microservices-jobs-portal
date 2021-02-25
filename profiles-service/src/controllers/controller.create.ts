import { Request, Response } from 'express'
import { profileSchema } from '../models/model.profile'
import { cloudStorage, UploadApiResponse } from '../utils/util.cloud'
import { initCreateProfileSubscriber } from '../services/subscriber/service.profile'
import { setCreateProfilePublisher } from '../services/publisher/service.profile'
import { initSkillsProfileSubscriber } from '../services/subscriber/service.skills'
import { setSkillsProfilePublisher } from '../services/publisher/service.skills'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../../../users-service/src/utils/util.stream'
import { ProfilesDTO } from '../dto/dto.profile'

export const createController = async (req: Request, res: Response): Promise<void> => {
	const checkUserId: ProfilesDTO = await profileSchema.findOne({ userId: req.params.id }).lean()

	if (checkUserId) {
		await setSkillsProfilePublisher({ id: checkUserId._id, skills: req.body.skill })
		await initSkillsProfileSubscriber()
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

		await setCreateProfilePublisher({
			userId: req.params.id,
			photo: urls[0].secure_url,
			birthDate: req.body.birthDate,
			gender: req.body.gender,
			status: req.body.status,
			nationality: req.body.nationality,
			aboutme: req.body.aboutme,
			resume: urls[1].secure_url,
			skills: req.body.skills,
			workExperience: req.body.workExperience,
			education: req.body.education
		})
		await initCreateProfileSubscriber()
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
