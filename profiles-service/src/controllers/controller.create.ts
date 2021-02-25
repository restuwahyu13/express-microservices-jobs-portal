import { Request, Response } from 'express'
import { cloudStorage, UploadApiResponse } from '../utils/util.cloud'
import { initCreateProfileSubscriber } from '../services/subscriber/service.profile'
import { setCreateProfilePublisher } from '../services/publisher/service.profile'
import { getResponseSubscriber } from '../utils/util.message'
import { IRequest } from '../interface/interface.payload'

export const createController = async (req: Request, res: Response): Promise<any> => {
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

	const payloadBody: IRequest = {
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
	}

	return res.status(200).json(payloadBody)
}
