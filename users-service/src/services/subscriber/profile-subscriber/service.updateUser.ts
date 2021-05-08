import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { userSchema } from '../../../models/model.user'
import { UsersDTO } from '../../../dto/dto.users'
import { IUser } from '../../../interface/interface.user'

export const initUpdateUsersSubscriber = async (): Promise<void> => {
	const updateUsersSubscriber = new Subscriber({ key: 'Update Users' })
	const res: IUser = await updateUsersSubscriber.getMap('users:update:service')

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
			await setResponsePublisher({
				status: 404,
				message: `users account for this id ${res.userId} is not exist for this users, please create new account`
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: `users account for this id ${res.userId} successfully to updated`,
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
