import { Subscriber } from '../../utils/util.subscriber'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

const resetSubscriber = new Subscriber({ serviceName: 'reset', listenerName: 'reset:speaker' })

export const getResetSubscriber = (): Promise<Record<string, any>> => {
	return new Promise((resolve, reject) => {
		resetSubscriber.listener().then(async (res: IUser) => {
			try {
			} catch (err) {
				reject({ statusCode: 500, message: 'internal server error' })
			}
		})
	})
}
