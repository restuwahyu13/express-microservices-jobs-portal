import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { companiesModel } from '../../../models/model.companies'
import { CompaniesDTO } from '../../../dto/dto.companies'
import { ICompanies } from '../../../interface/interface.companies'

export const initActivationSubscriber = async (): Promise<void> => {
	const activationSubscriber = new Subscriber({ key: 'Companies Activation' })
	const { id }: ICompanies = await activationSubscriber.getMap('companies-activation:service')

	try {
		const checkCompanies: CompaniesDTO = await companiesModel.findById({ _id: id }).lean()

		if (!checkCompanies) {
			await setResponsePublisher({
				status: 404,
				message: 'compainesId is not exist for this users, please create new account'
			})
		} else {
			if (checkCompanies.active == true) {
				await setResponsePublisher({
					status: 400,
					message: 'companies account has been active, please login'
				})
			} else {
				const updateActivation: CompaniesDTO = await companiesModel.findByIdAndUpdate(checkCompanies._id, {
					active: true,
					updatedAt: new Date()
				})

				if (!updateActivation) {
					await setResponsePublisher({
						status: 403,
						message: 'activation account failed, please resend new token'
					})
				}

				await setResponsePublisher({
					status: 200,
					message: 'activation account successfully, please login'
				})
			}
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error:${error}`
		})
	}
}
