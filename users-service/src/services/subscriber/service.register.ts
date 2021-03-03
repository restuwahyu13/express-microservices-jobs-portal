import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { hashPassword } from '../../utils/util.encrypt'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

export const initRegisterSubscriber = async (): Promise<void> => {
	const registerSubscriber = new Subscriber({ key: 'Register' })
	const res: IUser = await registerSubscriber.getMap('register:service')
	try {
		const checkUser: UsersDTO = await userSchema.findOne({ email: res.email }).lean()

		if (checkUser) {
			await setResponsePublisher(`users:register:${uuid()}`, {
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
				await setResponsePublisher(`users:register:${uuid()}`, {
					status: 403,
					message: 'create new account failed, please try again'
				})
			} else {
				await setResponsePublisher(`users:register:${uuid()}`, {
					status: 201,
					message: `create new account successfully, please check your email ${res.email}`,
					data: createNewAccount
				})
			}
		}
	} catch (err) {
		await setResponsePublisher(`users:register:${uuid()}`, {
			status: 500,
			message: 'internal server error'
		})
	}
}
