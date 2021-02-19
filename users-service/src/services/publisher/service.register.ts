import { Publisher } from '../../utils/util.publisher'

export const registerPublisher = new Publisher({ serviceName: 'register', speakerName: 'register:speaker' })

export const setRegisterPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await registerPublisher.speaker({ ...data }, { removeOnComplete: 1000, removeOnFail: 1000 })
	} else {
		await registerPublisher.speaker({}, {})
	}
}
