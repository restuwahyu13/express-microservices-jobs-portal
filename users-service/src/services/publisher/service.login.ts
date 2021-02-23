import { Publisher } from '../../utils/util.publisher'

let PORT = process.env.REDIS_PORT || 6380 || 6381 || 6382

export const loginPublisher = new Publisher({
	serviceName: 'login',
	speakerName: 'login:speaker',
	options: { host: '127.0.0.1', port: PORT }
})

export const setLoginPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await loginPublisher.speaker({ ...data }, { removeOnComplete: 1000, removeOnFail: 1000 })
	} else {
		await loginPublisher.speaker({}, {})
	}
}
