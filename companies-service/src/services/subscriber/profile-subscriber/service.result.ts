import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { companiesModel } from '../../../models/model.companies'
import { CompaniesDTO } from '../../../dto/dto.companies'
import { ICompanies } from '../../../interface/interface.companies'

export const initResultCompaniesSubscriber = async (): Promise<void> => {
	const resultCompaniesSubscriber = new Subscriber({ key: 'Result Companies' })
	const res: ICompanies = await resultCompaniesSubscriber.getMap('companies:result:service')

	try {
		const checkCompaniesId: CompaniesDTO = await companiesModel.findOne({ companyId: res.companiesId }, { __v: 0 }).lean()

		if (!checkCompaniesId) {
			await setResponsePublisher({
				status: 404,
				message: `companies account for this id ${res.companiesId} is not exist for this companies, please create new account`
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `companies account for this id ${res.companiesId}, ready to use`,
				data: checkCompaniesId
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
