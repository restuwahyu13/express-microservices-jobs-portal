import { Subscriber } from '../../utils/util.subscriber'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { hashPassword } from '../../utils/util.encrypt'

const createSubscriber = new Subscriber({ serviceName: 'create', listenerName: 'create:speaker' })

export const getRegisterSubscriber = () => {
	return new Promise((resolve, reject) => {
		createSubscriber.listener().then(async (res) => {
			try {
				const checkUser: UsersDTO = await userSchema.findOne({ email: res.email }).lean()

				if (checkUser) {
					resolve({ statusCode: 409, message: 'email already exist' })
				} else {
					const addUser = await userSchema.create({
						firstName: res.firstName,
						lastName: res.lastName,
						email: res.email,
						password: hashPassword(res.password),
						location: res.location,
						phone: res.phone
					})

					if (addUser) {
						resolve({ statusCode: 201, message: 'add new user successfully' })
					} else {
						resolve({ statusCode: 400, message: 'add new user failed' })
					}
				}
			} catch (err) {
				reject({ statusCode: 500, message: 'internal server error' })
			}
		})
	})
}
