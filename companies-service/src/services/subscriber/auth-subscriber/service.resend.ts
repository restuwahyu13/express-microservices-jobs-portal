import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { companiesModel } from '../../../models/model.companies'
import { CompaniesDTO } from '../../../dto/dto.companies'
import { ICompanies } from '../../../interface/interface.companies'

export const initResendSubscriber = async (): Promise<void> => {
	const resendSubscriber = new Subscriber({ key: 'Companies Resend' })
	const { email }: ICompanies = await resendSubscriber.getMap('companies-resend:service')

	try {
		const checkCompanies: CompaniesDTO = await companiesModel.findOne({ email }).lean()

		if (!checkCompanies) {
			await setResponsePublisher({
				status: 404,
				message: 'user is not exist for this email, please register new account'
			})
		} else {
			if (checkCompanies.active == true) {
				await setResponsePublisher({
					status: 400,
					message: 'companies account has been active, please login'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: `resend new token successfully, please check your email ${checkCompanies.email}`,
					data: checkCompanies
				})
			}
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
