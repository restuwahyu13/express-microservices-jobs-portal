import { Subscriber } from '../../utils/util.subscriber'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { hashPassword } from '../../utils/util.encrypt'
import { IUser } from '../../interface/interface.user'

const activationSubscriber = new Subscriber({ serviceName: 'activation', listenerName: 'activation:speaker' })

export const getActivationSubscriber = (): Promise<Record<string, any>> => {
	return new Promise((resolve, reject) => {
		activationSubscriber.listener().then(async (res: IUser) => {
			try {
				const checkUserId: UsersDTO = await userSchema.findById({ _id: res.id }).lean()
				const checkActivation: UsersDTO = await userSchema.findOne({ active: checkUserId.active }).lean()

				if (!checkUserId) {
					resolve({ statusCode: 404, message: 'userId is not exist for this users, please create new account' })
				}

				if (checkActivation) {
					resolve({ statusCode: 200, message: `user account has been active, please login` })
				}

				const updateActivation: UsersDTO = await userSchema.findByIdAndUpdate(checkUserId._id, {
					active: true,
					updatedAt: new Date()
				})

				if (updateActivation) {
					resolve({ statusCode: 201, message: `activation account failed, please resend new token` })
				}

				resolve({ statusCode: 200, message: `activation account successfuly, please login` })
			} catch (err) {
				reject({ statusCode: 500, message: 'internal server error' })
			}
		})
	})
}
