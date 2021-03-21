import { Request, Response } from 'express'
import { setResultCompaniesPublisher } from '../../services/publisher/profile-publisher/service.result'
import { initResultCompaniesSubscriber } from '../../services/subscriber/profile-subscriber/service.result'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'
import { expressValidator } from '../../utils/util.validator'

export const resultCompaniesController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setResultCompaniesPublisher({ companiesId: req.params.companiesId })
		await initResultCompaniesSubscriber()
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
				companie: data
			})
		}
	}
}
