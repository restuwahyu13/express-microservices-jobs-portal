import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { userSchema } from '../../../models/model.user'
import { UsersDTO } from '../../../dto/dto.users'
import { IUser } from '../../../interface/interface.user'

export const initDeleteUsersSubscriber = async (): Promise<void> => {
	const deleteUsersSubscriber = new Subscriber({ key: 'Delete Users' })
	const res: IUser = await deleteUsersSubscriber.getMap('users:delete:service')

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
				message: `users account for this id ${res.userId} successfully to deleted`
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
