import { Publisher } from '../../utils/util.publisher'

export const registerPublisher = new Publisher({
	serviceName: 'register',
	speakerName: 'register:speaker',
	connections: [
		{ host: '127.0.0.1', port: 6379 },
		{ host: '127.0.0.1', port: 6380 },
		{ host: '127.0.0.1', port: 6381 }
	]
})

export const setRegisterPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await registerPublisher.speaker({ ...data }, { removeOnComplete: 1000, removeOnFail: 1000 })
	} else {
		await registerPublisher.speaker({}, {})
	}
}
