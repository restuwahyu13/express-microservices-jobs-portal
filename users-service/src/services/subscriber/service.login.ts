import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

export const initLoginSubscriber = async (): Promise<void> => {
	const loginSubscriber = new Subscriber({ key: 'Login' })
	const { email }: IUser = await loginSubscriber.getMap('login:service')
	try {
		const checkUser: UsersDTO = await userSchema.findOne({ email })

		if (!checkUser) {
			await setResponsePublisher({
				status: 404,
				message: 'user account is not exist, please register new account'
			})
		} else {
			if (checkUser.active == false) {
				await setResponsePublisher({
					status: 400,
					message: 'user account is not active, please resend new activation token'
				})
			} else {
				await userSchema.findByIdAndUpdate(checkUser._id, {
					firstLogin: new Date(),
					updatedAt: new Date()
				})

				await setResponsePublisher({
					status: 200,
					message: 'login successfully',
					data: checkUser
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
