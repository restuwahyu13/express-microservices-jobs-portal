import { Request, Response } from 'express'
import { setDeleteCompaniesPublisher } from '../../services/publisher/profile-publisher/service.delete'
import { initDeleteCompaniesSubscriber } from '../../services/subscriber/profile-subscriber/service.delete'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'
import { expressValidator } from '../../utils/util.validator'

export const deleteCompaniesController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
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
}
