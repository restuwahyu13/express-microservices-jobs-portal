import { Request, Response } from 'express'
import { setResultCompaniesPublisher } from '../../services/publisher/profile-publisher/service.resultCompanies'
import { initResultCompaniesSubscriber } from '../../services/subscriber/profile-subscriber/service.resultCompanies'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'

export const resultUserController = async (req: Request, res: Response): Promise<void> => {
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
