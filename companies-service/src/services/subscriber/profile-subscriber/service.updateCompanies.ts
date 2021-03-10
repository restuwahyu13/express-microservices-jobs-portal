import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { companiesModel } from '../../../models/model.companies'
import { CompaniesDTO } from '../../../dto/dto.companies'
import { ICompanies } from '../../../interface/interface.companies'

export const initUpdateCompaniesSubscriber = async (): Promise<void> => {
	const updateCompaniesSubscriber = new Subscriber({ key: 'Update Companies' })
	const res: ICompanies = await updateCompaniesSubscriber.getMap('companies:update:service')

	try {
		const checkCompanies: CompaniesDTO = await companiesModel
			.findOneAndUpdate(
				{ companiesId: res.companiesId },
				{
					$set: {
						companyName: res.companyName,
						email: res.email,
						location: res.location,
						phone: res.phone
					}
				}
			)
			.lean()

		if (!checkCompanies) {
			await setResponsePublisher({
				status: 404,
				message: `companies account for this id ${res.companiesId} is not exist for this companies, please create new account`
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `companies account for this id ${res.companiesId}, ready to use`
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
