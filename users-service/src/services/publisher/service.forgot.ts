import { Publisher } from '../../utils/util.publisher'

export const forgotPublisher = new Publisher({ serviceName: 'forgot', speakerName: 'forgot:speaker' })

export const setForgotPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await forgotPublisher.speaker({ ...data }, { removeOnComplete: true, removeOnFail: 1000 })
	} else {
		await forgotPublisher.speaker({}, {})
	}
}
