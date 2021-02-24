import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { toJson } from '../../utils/util.parse'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

export const initForgotSubscriber = async (): Promise<void> => {
	const forgotSubscriber = new Subscriber({ key: 'Forgot' })
	const { email }: IUser = await forgotSubscriber.getMap('forgot:service')
	try {
		const checkUser: UsersDTO = await userSchema.findOne({ email }).lean()

		if (!checkUser) {
			await setResponsePublisher({
				statusCode: 404,
				message: 'user is not exist for this email, please register new account'
			})
		} else {
			await setResponsePublisher({
				statusCode: 200,
				message: `reset password successfully, please check your email ${checkUser.email}`,
				data: toJson(checkUser)
			})
		}
	} catch (err) {
		await setResponsePublisher({
			statusCode: 500,
			message: 'internal server error'
		})
	}
}
