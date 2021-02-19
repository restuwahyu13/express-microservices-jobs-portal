import { Publisher } from '../../utils/util.publisher'

export const resendPublisher = new Publisher({ serviceName: 'resend', speakerName: 'resend:speaker' })

export const setResendPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await resendPublisher.speaker({ ...data }, { removeOnComplete: true, removeOnFail: 1000 })
	} else {
		await resendPublisher.speaker({}, {})
	}
}
