import { Subscriber } from '../../utils/util.subscriber'
import { userSchema } from '../../models/model.user'
import { UsersDTO } from '../../dto/dto.users'
import { IUser } from '../../interface/interface.user'

const forgotSubscriber = new Subscriber({ serviceName: 'forgot', listenerName: 'forgot:speaker' })

export const getForgotSubscriber = (): Promise<Record<string, any>> => {
	return new Promise((resolve, reject) => {
		forgotSubscriber.listener().then(async (res: IUser) => {
			try {
			} catch (err) {
				reject({ statusCode: 500, message: 'internal server error' })
			}
		})
	})
}
