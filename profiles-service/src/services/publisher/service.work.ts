import { Publisher } from '../../utils/util.publisher'

export const setWorkProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const workProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await workProfilePublisher.setMap('work:service', data)
	} else {
		await workProfilePublisher.setMap('work:service', {})
	}
}
