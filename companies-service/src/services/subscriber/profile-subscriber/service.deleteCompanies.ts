import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { companiesModel } from '../../../models/model.companies'
import { CompaniesDTO } from '../../../dto/dto.companies'
import { ICompanies } from '../../../interface/interface.companies'

export const initDeleteCompaniesSubscriber = async (): Promise<void> => {
	const deleteCompaniesSubscriber = new Subscriber({ key: 'Delete Companies' })
	const res: ICompanies = await deleteCompaniesSubscriber.getMap('companies:delete:service')

	try {
		const checkCompaniesId: CompaniesDTO = await companiesModel.findOneAndDelete({ companiesId: res.companiesId }).lean()

		if (!checkCompaniesId) {
			await setResponsePublisher({
				status: 404,
				message: `companies account for this id ${res.companiesId} is not exist for this companies, please create new account`
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `deleted companies account for this id ${res.companiesId} successfully`
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
