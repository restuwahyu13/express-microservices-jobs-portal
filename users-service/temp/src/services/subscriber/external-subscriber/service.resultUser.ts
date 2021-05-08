import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { userSchema } from '../../../models/model.user'
import { UsersDTO } from '../../../dto/dto.users'
import { IUser } from '../../../interface/interface.user'

export const initResultUsersSubscriber = async (): Promise<void> => {
	const resultUsersSubscriber = new Subscriber({ key: 'Result Users' })
	const res: IUser = await resultUsersSubscriber.getMap('users:result:service')

	try {
		const checkUserId: UsersDTO = await userSchema.findOne({ userId: res.userId }, { __v: 0 }).lean()

		if (!checkUserId) {
			await setResponsePublisher({
				status: 404,
				message: `users account for this id ${res.userId} is not exist for this users, please create new account`
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `users account for this id ${res.userId} ready to use`,
				data: checkUserId
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
