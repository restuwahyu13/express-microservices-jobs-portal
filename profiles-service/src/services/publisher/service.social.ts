import { Publisher } from '../../utils/util.publisher'

export const setSocialsProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const socialsProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await socialsProfilePublisher.setMap('csocials:service', data)
	} else {
		await socialsProfilePublisher.setMap('csocials:service', {})
	}
}
