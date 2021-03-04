import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

export const initUpdateUserSubscriber = async (): Promise<void> => {
	const getUserSubscriber = new Subscriber({ key: 'Update User' })
	const res: IUser = await getUserSubscriber.getMap('users:update:service')

	try {
		const checkUser: UsersDTO = await userSchema
			.findOneAndUpdate(
				{ userId: res.userId },
				{
					$set: {
						firstName: res.firstName,
						lastName: res.lastName,
						email: res.email,
						location: res.location,
						phone: res.phone
					}
				}
			)
			.lean()

		if (!checkUser) {
			await setResponsePublisher(`users:update:${uuid()}`, {
				status: 404,
				message: `users account for this id ${res.userId} is not exist for this users, please create new account`
			})
		} else {
			await setResponsePublisher(`users:update:${uuid()}`, {
				status: 200,
				message: `users account for this id ${res.userId}, ready to use`,
				data: checkUser
			})
		}
	} catch (error) {
		await setResponsePublisher(`users:update:${uuid()}`, {
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
