import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { hashPassword } from '../../utils/util.encrypt'
import { toJson } from '../../utils/util.parse'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

export const initRegisterSubscriber = async (): Promise<void> => {
	const registerSubscriber = new Subscriber({ key: 'Register' })
	const { firstName, lastName, email, password, location, phone }: IUser = await registerSubscriber.getMap('register:service')
	try {
		const checkUser: UsersDTO = await userSchema.findOne({ email }).lean()

		if (checkUser) {
			await setResponsePublisher({
				status: 409,
				message: 'email already taken, please try again'
			})
		}

		const createNewAccount: UsersDTO = await userSchema.create({
			firstName,
			lastName,
			email,
			password: hashPassword(password),
			location,
			phone,
			createdAt: new Date()
		})

		if (!createNewAccount) {
			await setResponsePublisher({
				status: 403,
				message: 'create new account failed, please try again'
			})
		}

		await setResponsePublisher({
			status: 201,
			message: `create new account successfully, please check your email ${email}`,
			data: toJson(createNewAccount)
		})
	} catch (err) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
