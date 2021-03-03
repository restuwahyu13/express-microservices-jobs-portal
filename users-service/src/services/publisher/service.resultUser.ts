import { Publisher } from '../../utils/util.publisher'

export const setResultUserPublisher = async (data: Record<string, any>): Promise<void> => {
	const resultUserPublisher = new Publisher({ key: 'Result User' })
	if (Object.keys(data).length > 0 && data) {
		await resultUserPublisher.setMap('users:result:service', data)
	} else {
		await resultUserPublisher.setMap('users:result:service', {})
	}
}
