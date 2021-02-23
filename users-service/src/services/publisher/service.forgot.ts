import { Publisher } from '../../utils/util.publisher'

let PORT = process.env.REDIS_PORT || 6380 || 6381 || 6382

export const forgotPublisher = new Publisher({
	serviceName: 'forgot',
	speakerName: 'forgot:speaker',
	options: { host: '127.0.0.1', port: PORT }
})

export const setForgotPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await forgotPublisher.speaker({ ...data }, { removeOnComplete: 1000, removeOnFail: 1000 })
	} else {
		await forgotPublisher.speaker({}, {})
	}
}
