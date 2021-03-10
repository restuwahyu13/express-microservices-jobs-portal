import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { hashPassword } from '../../../utils/util.encrypt'
import { userSchema } from '../../../models/model.user'
import { UsersDTO } from '../../../dto/dto.users'
import { IUser } from '../../../interface/interface.user'

export const initRegisterSubscriber = async (): Promise<void> => {
	const registerSubscriber = new Subscriber({ key: 'Users Register' })
	const res: IUser = await registerSubscriber.getMap('users-register:service')

	try {
		const checkUser: UsersDTO = await userSchema.findOne({ email: res.email }).lean()

		if (checkUser) {
			await setResponsePublisher({
				status: 409,
				message: 'email already taken, please try again'
			})
		} else {
			const createNewAccount = await userSchema.create({
				firstName: res.firstName,
				lastName: res.lastName,
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
