import { Publisher } from '../../utils/util.publisher'

export const setVolunteersProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const volunteersProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await volunteersProfilePublisher.setMap('cvolunteers:service', data)
	} else {
		await volunteersProfilePublisher.setMap('cvolunteers:service', {})
	}
}
