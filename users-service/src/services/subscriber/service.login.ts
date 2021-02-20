import { Subscriber } from '../../utils/util.subscriber'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

const loginSubscriber = new Subscriber({ serviceName: 'login', listenerName: 'login:speaker' })

export const getLoginSubscriber = (): Promise<Record<string, any>> => {
	return new Promise((resolve, reject) => {
		loginSubscriber.listener().then(async (res: IUser) => {
			try {
				const checkUser: UsersDTO = await userSchema.findOne({ email: res.email })

				if (!checkUser) {
					resolve({
						statusCode: 404,
						message: 'user account is not exist, please register new account'
					})
				}

				if (checkUser.active == false) {
					resolve({
						statusCode: 400,
						message: 'user account is not active, please resend new activation token'
					})
				}

				await userSchema.findByIdAndUpdate(checkUser._id, {
					firstLogin: new Date(),
					updatedAt: new Date()
				})

				resolve({
					statusCode: 200,
					message: 'login successfully',
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
