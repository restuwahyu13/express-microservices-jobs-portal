import { Subscriber } from '../../utils/util.subscriber'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'
import { hashPassword } from '../../utils/util.encrypt'

const resetSubscriber = new Subscriber({
	serviceName: 'reset',
	listenerName: 'reset:speaker',
	connections: [
		{ host: '127.0.0.1', port: 6379 },
		{ host: '127.0.0.1', port: 6380 },
		{ host: '127.0.0.1', port: 6381 }
	]
})

export const getResetSubscriber = (): Promise<Record<string, any>> => {
	return new Promise((resolve, reject) => {
		resetSubscriber.listener().then(async (res: IUser) => {
			try {
				const checkUser: UsersDTO = await userSchema.findById({ _id: res.id })

				if (!checkUser) {
					resolve({
						statusCode: 404,
						message: 'userId is not exist for this users, please create new account'
					})
				}

				const changePassword: UsersDTO = await userSchema.findByIdAndUpdate(checkUser._id, {
					password: hashPassword(res.password),
					updatedAt: new Date()
				})

				if (!changePassword) {
					resolve({
						statusCode: 403,
						message: 'change new password failed, please try again'
					})
				}

				resolve({
					statusCode: 200,
					message: 'change new password successfully, please login'
				})
			} catch (err) {
				reject({ statusCode: 500, message: 'internal server error' })
			}
		})
	})
}
