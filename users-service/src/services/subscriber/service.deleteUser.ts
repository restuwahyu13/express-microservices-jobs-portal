import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

export const initDeleteUserSubscriber = async (): Promise<void> => {
	const deleteUserSubscriber = new Subscriber({ key: 'Delete User' })
	const res: IUser = await deleteUserSubscriber.getMap('users:delete:service')

	try {
		const checkUserId: UsersDTO = await userSchema.findOneAndDelete({ userId: res.userId }).lean()

		if (!checkUserId) {
			await setResponsePublisher({
				status: 404,
				message: `users account for this id ${res.userId} is not exist for this users, please create new account`
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `deleted users account for this id ${res.userId} successfully`
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
