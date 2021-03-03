import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { hashPassword } from '../../utils/util.encrypt'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

export const initResetSubscriber = async (): Promise<void> => {
	const resetSubscriber = new Subscriber({ key: 'Reset' })
	const { id, password }: IUser = await resetSubscriber.getMap('reset:service')
	try {
		const checkUser: UsersDTO = await userSchema.findById({ _id: id })

		if (!checkUser) {
			await setResponsePublisher({
				status: 404,
				message: 'userId is not exist for this users, please create new account'
			})
		} else {
			const changePassword: UsersDTO = await userSchema.findByIdAndUpdate(checkUser._id, {
				password: hashPassword(password),
				updatedAt: new Date()
			})

			if (!changePassword) {
				await setResponsePublisher({
					status: 403,
					message: 'change new password failed, please try again'
				})
			} else {
				await setResponsePublisher({
					status: 200,
					message: 'change new password successfully, please login'
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
