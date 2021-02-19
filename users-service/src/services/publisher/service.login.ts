import { Publisher } from '../../utils/util.publisher'

export const loginPublisher = new Publisher({ serviceName: 'login', speakerName: 'login:speaker' })

export const setLoginPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await loginPublisher.speaker({ ...data }, { removeOnComplete: 1000, removeOnFail: 1000 })
	} else {
		await loginPublisher.speaker({}, {})
	}
}
