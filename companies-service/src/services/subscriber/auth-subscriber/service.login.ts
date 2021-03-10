import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { companiesModel } from '../../../models/model.companies'
import { CompaniesDTO } from '../../../dto/dto.companies'
import { ICompanies } from '../../../interface/interface.companies'

export const initLoginSubscriber = async (): Promise<void> => {
	const loginSubscriber = new Subscriber({ key: 'Companies Login' })
	const { email }: ICompanies = await loginSubscriber.getMap('companies-login:service')

	try {
		const checkCompanies: CompaniesDTO = await companiesModel.findOne({ email })

		if (!checkCompanies) {
			await setResponsePublisher({
				status: 404,
				message: 'companies account is not exist, please register new account'
			})
		} else {
			if (checkCompanies.active == false) {
				await setResponsePublisher({
					status: 400,
					message: 'companies account is not active, please resend new activation token'
				})
			} else {
				await companiesModel.findByIdAndUpdate(checkCompanies._id, {
					firstLogin: new Date(),
					updatedAt: new Date()
				})

				await setResponsePublisher({
					status: 200,
					message: 'login successfully',
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
