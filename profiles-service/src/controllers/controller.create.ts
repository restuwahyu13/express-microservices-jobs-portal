import { Request, Response } from 'express'
import { cloudStorage, UploadApiResponse } from '../utils/util.cloud'
import { IBasic, IWorkExperince, IEducation } from '../interface/interface.payload'

export const createController = async (req: Request, res: Response): Promise<any> => {
	const photo = (await cloudStorage(req.file.path)) as UploadApiResponse
	const payloadBody: Partial<IBasic | IWorkExperince | IEducation> = {
		userId: req.params.id,
		photo: photo.secure_url,
		birthDate: req.body.birthDate,
		gender: req.body.gender,
		status: req.body.status,
		nationality: req.body.nationality,
		aboutme: req.body.aboutme,
		resume: req.body.resume,
		skills: req.body.skills,
		workExperience: req.body.workExperience,
		education: req.body.education
	}

	return res.status(200).json(payloadBody)
}
