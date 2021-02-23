import { Publisher } from '../../utils/util.publisher'

export const resendPublisher = new Publisher({
	serviceName: 'resend',
	speakerName: 'resend:speaker',
	connections: [
		{ host: '127.0.0.1', port: 6379 },
		{ host: '127.0.0.1', port: 6380 },
		{ host: '127.0.0.1', port: 6381 }
	]
})

export const setResendPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await resendPublisher.speaker({ ...data }, { removeOnComplete: 1000, removeOnFail: 1000 })
	} else {
		await resendPublisher.speaker({}, {})
	}
}
