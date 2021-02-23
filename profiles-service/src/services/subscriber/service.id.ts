import { Subscriber } from '../../utils/util.subscriber'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'

const idSubscriber = new Subscriber({ serviceName: 'id', listenerName: 'id:speaker' })

export const getIdSubscriber = (): Promise<Record<string, any>> => {
	return new Promise((resolve, reject) => {
		idSubscriber.listener().then(async (res) => {
			resolve({
				name: 'john doe'
			})
		})
	})
}
