import { Subscriber } from '../../utils/util.subscriber'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { hashPassword } from '../../utils/util.encrypt'
import { IUser } from '../../interface/interface.user'

const createSubscriber = new Subscriber({ serviceName: 'register', listenerName: 'register:speaker' })

export const getRegisterSubscriber = (): Promise<Record<string, any>> => {
	return new Promise((resolve, reject) => {
		createSubscriber.listener().then(async (res: IUser) => {
			try {
				const checkUser: UsersDTO = await userSchema.findOne({ email: res.email }).lean()

				if (checkUser) {
					resolve({
						statusCode: 409,
						message: 'email already taken, please try again'
					})
				}

				const createNewAccount: UsersDTO = await userSchema.create({
					firstName: res.firstName,
					lastName: res.lastName,
					email: res.email,
					password: hashPassword(res.password),
					location: res.location,
					phone: res.phone,
					createdAt: new Date()
				})

				if (!createNewAccount) {
					resolve({
						statusCode: 403,
						message: 'create new account failed, please try again'
					})
				}

				resolve({
					statusCode: 201,
					message: `create new account successfully, please check your email ${res.email}`,
					data: createNewAccount
				})
			} catch (err) {
				reject({
					statusCode: 500,
					message: 'internal server error'
				})
			}
		})
	})
}
