import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { userSchema } from '../../../models/model.user'
import { UsersDTO } from '../../../dto/dto.users'
import { IUser } from '../../../interface/interface.user'

export const initGetUserSubscriber = async (): Promise<void> => {
	const getUserSubscriber = new Subscriber({ key: 'getUser' })
	const { id }: IUser = await getUserSubscriber.getMap('getUser:service')

	try {
		const checkUser: UsersDTO = await userSchema.findById({ _id: id }).lean()

		if (!checkUser) {
			await setResponsePublisher({
				status: 404,
				message: 'userId is not exist for this users, please create new account'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: 'userId already exist, ready to use',
				data: checkUser
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
