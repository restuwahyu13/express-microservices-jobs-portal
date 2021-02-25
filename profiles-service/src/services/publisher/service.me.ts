import { Publisher } from '../../utils/util.publisher'

export const setResultPublisher = async (data: Record<string, any>): Promise<void> => {
	const resultPublisher = new Publisher({ key: 'Result' })
	if (Object.keys(data).length > 0 && data) {
		await resultPublisher.setMap('result:service', { ...data })
	} else {
		await resultPublisher.setMap('result:service', {})
	}
}
