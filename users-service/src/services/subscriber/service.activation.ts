import { Subscriber } from '../../utils/util.subscriber'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

let PORT = process.env.REDIS_PORT || 6380 || 6381 || 6382

const activationSubscriber = new Subscriber({
	serviceName: 'activation',
	listenerName: 'activation:speaker',
	options: { host: '127.0.0.1', port: PORT }
})

export const getActivationSubscriber = (): Promise<Record<string, any>> => {
	return new Promise((resolve, reject) => {
		activationSubscriber.listener().then(async (res: IUser) => {
			try {
				const checkUser: UsersDTO = await userSchema.findById({ _id: res.id }).lean()

				if (!checkUser) {
					resolve({
						statusCode: 404,
						message: 'userId is not exist for this users, please create new account'
					})
				}

				if (checkUser.active == true) {
					resolve({
						statusCode: 400,
						message: 'user account has been active, please login'
					})
				}

				const updateActivation: UsersDTO = await userSchema.findByIdAndUpdate(checkUser._id, {
					active: true,
					updatedAt: new Date()
				})

				if (!updateActivation) {
					resolve({
						statusCode: 403,
						message: 'activation account failed, please resend new token'
					})
				}

				resolve({
					statusCode: 200,
					message: 'activation account successfully, please login'
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
