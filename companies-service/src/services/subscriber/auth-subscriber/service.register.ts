import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { hashPassword } from '../../../utils/util.encrypt'
import { companiesModel } from '../../../models/model.companies'
import { CompaniesDTO } from '../../../dto/dto.companies'
import { ICompanies } from '../../../interface/interface.companies'

export const initRegisterSubscriber = async (): Promise<void> => {
	const registerSubscriber = new Subscriber({ key: 'Companies Register' })
	const res: ICompanies = await registerSubscriber.getMap('companies-register:service')

	try {
		const checkUser: CompaniesDTO = await companiesModel.findOne({ email: res.email }).lean()

		if (checkUser) {
			await setResponsePublisher({
				status: 409,
				message: 'email already taken, please try again'
			})
		} else {
			const createNewAccount: CompaniesDTO = await companiesModel.create({
				companyName: res.companyName,
				email: res.email,
				password: hashPassword(res.password),
				location: res.location,
				phone: res.phone,
				createdAt: new Date()
			})
			if (!createNewAccount) {
				await setResponsePublisher({
					status: 403,
					message: 'create new account failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 201,
					message: `create new account successfully, please check your email ${res.email}`,
					data: createNewAccount
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
