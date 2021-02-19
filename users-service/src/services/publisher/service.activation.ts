import { Publisher } from '../../utils/util.publisher'

export const activationPublisher = new Publisher({ serviceName: 'activation', speakerName: 'activation:speaker' })

export const setActivationPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await activationPublisher.speaker({ ...data }, { removeOnComplete: 1000, removeOnFail: 1000 })
	} else {
		await activationPublisher.speaker({}, {})
	}
}
