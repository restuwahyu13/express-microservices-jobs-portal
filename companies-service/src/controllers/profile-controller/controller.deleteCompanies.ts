import { Request, Response } from 'express'
import { setDeleteCompaniesPublisher } from '../../services/publisher/profile-publisher/service.deleteCompanies'
import { initDeleteCompaniesSubscriber } from '../../services/subscriber/profile-subscriber/service.deleteCompanies'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'

export const deleteCompaniesController = async (req: Request, res: Response): Promise<void> => {
	await setDeleteCompaniesPublisher({ companiesId: req.params.companiesId })
	await initDeleteCompaniesSubscriber()
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
