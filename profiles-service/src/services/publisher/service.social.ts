import { Publisher } from '../../utils/util.publisher'

export const setSocialProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const socialProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await socialProfilePublisher.setMap('social:service', data)
	} else {
		await socialProfilePublisher.setMap('social:service', {})
	}
}