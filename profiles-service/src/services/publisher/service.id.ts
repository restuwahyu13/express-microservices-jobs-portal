import { Publisher } from '../../utils/util.publisher'

export const idPublisher = new Publisher({ serviceName: 'id', speakerName: 'id:speaker' })

export const setIdPublisher = async (data: Record<string, any>): Promise<any> => {
	if (Object.keys(data).length > 0 && data) {
		await idPublisher.speaker({ ...data }, { removeOnComplete: 1000, removeOnFail: 1000 })
	} else {
		await idPublisher.speaker({}, {})
	}
}
