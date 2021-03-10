import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { companiesModel } from '../../../models/model.companies'
import { CompaniesDTO } from '../../../dto/dto.companies'
import { ICompanies } from '../../../interface/interface.companies'

export const initForgotSubscriber = async (): Promise<void> => {
	const forgotSubscriber = new Subscriber({ key: 'Companies Forgot' })
	const { email }: ICompanies = await forgotSubscriber.getMap('companies-forgot:service')

	try {
		const checkCompanies: CompaniesDTO = await companiesModel.findOne({ email }).lean()

		if (!checkCompanies) {
			await setResponsePublisher({
				status: 404,
				message: 'companies account is not exist for this email, please register new account'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `reset password successfully, please check your email ${checkCompanies.email}`,
				data: checkCompanies
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
