import { Publisher } from '../../utils/util.publisher'

export const setGetUserPublisher = async (data: Record<string, any>): Promise<void> => {
	const getUserPublisher = new Publisher({ key: 'getUser' })
	if (Object.keys(data).length > 0 && data) {
		await getUserPublisher.setMap('getUser:service', data)
	} else {
		await getUserPublisher.setMap('getUser:service', {})
	}
}
