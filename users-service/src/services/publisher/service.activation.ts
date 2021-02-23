import { Publisher } from '../../utils/util.publisher'

let PORT = process.env.REDIS_PORT || 6380 || 6381 || 6382

export const activationPublisher = new Publisher({
	serviceName: 'activation',
	speakerName: 'activation:speaker',
	options: { host: '127.0.0.1', port: PORT }
})

export const setActivationPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await activationPublisher.speaker({ ...data }, { removeOnComplete: 1000, removeOnFail: 1000 })
	} else {
		await activationPublisher.speaker({}, {})
	}
}
