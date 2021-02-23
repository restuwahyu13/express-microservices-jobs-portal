import { Subscriber } from '../../utils/util.subscriber'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

let PORT = process.env.REDIS_PORT || 6380 || 6381 || 6382

const forgotSubscriber = new Subscriber({
	serviceName: 'forgot',
	listenerName: 'forgot:speaker',
	options: { host: '127.0.0.1', port: PORT }
})

export const getForgotSubscriber = (): Promise<Record<string, any>> => {
	return new Promise((resolve, reject) => {
		forgotSubscriber.listener().then(async (res: IUser) => {
			try {
				const checkUser: UsersDTO = await userSchema.findOne({ email: res.email }).lean()

				if (!checkUser) {
					resolve({
						statusCode: 404,
						message: 'user is not exist for this email, please register new account'
					})
				}

				resolve({
					statusCode: 200,
					message: `reset password successfully, please check your email ${checkUser.email}`,
					data: checkUser
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
