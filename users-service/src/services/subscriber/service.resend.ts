import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { toJson } from '../../utils/util.parse'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

export const initResendSubscriber = async (): Promise<void> => {
	const resendSubscriber = new Subscriber({ key: 'Resend' })
	const { email }: IUser = await resendSubscriber.getMap('resend:service')
	try {
		const checkUser: UsersDTO = await userSchema.findOne({ email }).lean()

		if (!checkUser) {
			await setResponsePublisher({
				status: 404,
				message: 'user is not exist for this email, please register new account'
			})
		} else {
			if (checkUser.active == true) {
				await setResponsePublisher({
					status: 400,
					message: 'user account has been active, please login'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: `resend new token successfully, please check your email ${checkUser.email}`,
					data: toJson(checkUser)
				})
			}
		}
	} catch (err) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
