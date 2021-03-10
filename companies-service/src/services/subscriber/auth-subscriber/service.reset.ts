import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { hashPassword } from '../../../utils/util.encrypt'
import { companiesModel } from '../../../models/model.companies'
import { CompaniesDTO } from '../../../dto/dto.companies'
import { ICompanies } from '../../../interface/interface.companies'

export const initResetSubscriber = async (): Promise<void> => {
	const resetSubscriber = new Subscriber({ key: 'Companies Reset' })
	const { id, password }: ICompanies = await resetSubscriber.getMap('companies-reset:service')

	try {
		const checkCompanies: CompaniesDTO = await companiesModel.findById({ _id: id })

		if (!checkCompanies) {
			await setResponsePublisher({
				status: 404,
				message: 'companiesId is not exist for this users, please create new account'
			})
		} else {
			const changePassword: CompaniesDTO = await companiesModel.findByIdAndUpdate(checkCompanies._id, {
				password: hashPassword(password),
				updatedAt: new Date()
			})

			if (!changePassword) {
				await setResponsePublisher({
					status: 403,
					message: 'change new password failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'change new password successfully, please login'
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
