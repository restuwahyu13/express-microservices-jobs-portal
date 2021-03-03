import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

export const initDeleteUserSubscriber = async (): Promise<void> => {
	const getUserSubscriber = new Subscriber({ key: 'Result User' })
	const { userId }: IUser = await getUserSubscriber.getMap('users:result:service')

	try {
		const checkUserId: UsersDTO = await userSchema.findOneAndDelete({ userId: userId }).lean()

		if (!checkUserId) {
			await setResponsePublisher(`users:delete:${uuid()}`, {
				status: 404,
				message: `users account for this id ${userId} is not exist for this users, please create new account`
			})
		} else {
			await setResponsePublisher(`users:delete:${uuid()}`, {
				status: 200,
				message: `deleted users account for this id ${userId} successfully`
			})
		}
	} catch (error) {
		await setResponsePublisher(`users:delete:${uuid()}`, {
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
