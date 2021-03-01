import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
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
				status: 404,
				message: 'user is not exist for this email, please register new account'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `reset password successfully, please check your email ${checkUser.email}`,
				data: checkUser
			})
		}
	} catch (err) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
