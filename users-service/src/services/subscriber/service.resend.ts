import { Subscriber } from '../../utils/util.subscriber'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

let PORT = process.env.REDIS_PORT || 6380 || 6381 || 6382

const resendSubscriber = new Subscriber({
	serviceName: 'resend',
	listenerName: 'resend:speaker',
	options: { host: '127.0.0.1', port: PORT }
})

export const getResendSubscriber = (): Promise<Record<string, any>> => {
	return new Promise((resolve, reject) => {
		resendSubscriber.listener().then(async (res: IUser) => {
			try {
				const checkUser: UsersDTO = await userSchema.findOne({ email: res.email }).lean()

				if (!checkUser) {
					resolve({
						statusCode: 404,
						message: 'user is not exist for this email, please register new account'
					})
				}

				if (checkUser.active == true) {
					resolve({
						statusCode: 400,
						message: 'user account has been active, please login'
					})
				}

				resolve({
					statusCode: 200,
					message: `resend new token successfully, please check your email ${checkUser.email}`,
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
