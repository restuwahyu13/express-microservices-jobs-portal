import { Request, Response } from 'express'
import { UploadApiResponse } from 'cloudinary'
import { setUpdateCompaniesPublisher } from '../../services/publisher/profile-publisher/service.updateCompanies'
import { initUpdateCompaniesSubscriber } from '../../services/subscriber/profile-subscriber/service.updateCompanies'
import { streamBox } from '../../utils/util.stream'
import { getResponseSubscriber } from '../../utils/util.message'
import { cloudStorage } from '../../utils/util.cloud'

export const updateCompaniesController = async (req: Request, res: Response): Promise<void> => {
	const urls: UploadApiResponse[] = []
	const photo: any = req.files['photo']
	const document: any = req.files['banner']
	const gallery: any = req.files['gallery']
	const files: Array<Record<string, any>> = photo.concat(document, gallery)

	for (let file of files) {
		try {
			const response = (await cloudStorage(file.path)) as UploadApiResponse
			urls.push(response)
		} catch (error) {
			throw new Error(error)
		}
	}

	await setUpdateCompaniesPublisher({
		companyId: req.params.companyId,
		companyName: req.body.companyName,
		email: req.body.email,
		phone: req.body.phone,
		photo: urls[0].secure_url,
		bannerPhoto: urls[1].secure_url,
		industry: req.body.industry,
		overview: req.body.overview,
		gallery: urls[2].secure_url
	})
	await initUpdateCompaniesSubscriber()
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
