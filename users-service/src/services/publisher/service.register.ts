import { Publisher } from '../../utils/util.publisher'

export const registerPublisher = new Publisher({ serviceName: 'register', speakerName: 'register:speaker' })

export const setRegisterPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 1 && data) {
		await registerPublisher.speaker({ ...data }, { removeOnComplete: 25, removeOnFail: 100 })
	} else {
		await registerPublisher.speaker({}, {})
	}
}
