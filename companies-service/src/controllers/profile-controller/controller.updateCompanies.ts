import { Request, Response } from 'express'
import { setUpdateCompaniesPublisher } from '../../services/publisher/profile-publisher/service.updateCompanies'
import { initUpdateCompaniesSubscriber } from '../../services/subscriber/profile-subscriber/service.updateCompanies'
import { streamBox } from '../../utils/util.stream'
import { getResponseSubscriber } from '../../utils/util.message'

export const updateCompaniesController = async (req: Request, res: Response): Promise<void> => {
	await setUpdateCompaniesPublisher({
		companiesId: req.params.companiesId,
		companyName: req.body.companyName,
		email: req.body.email,
		phone: req.body.phone
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
