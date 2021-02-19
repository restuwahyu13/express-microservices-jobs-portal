import { Publisher } from '../../utils/util.publisher'

export const resetPublisher = new Publisher({ serviceName: 'reset', speakerName: 'reset:speaker' })

export const setResetPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await resetPublisher.speaker({ ...data }, { removeOnComplete: 1000, removeOnFail: 1000 })
	} else {
		await resetPublisher.speaker({}, {})
	}
}
