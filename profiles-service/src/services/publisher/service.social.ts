import { Publisher } from '../../utils/util.publisher'

export const setCreateSocialsPublisher = async (data: Record<string, any>): Promise<void> => {
	const createSocialsPublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await createSocialsPublisher.setMap('csocials:service', data)
	} else {
		await createSocialsPublisher.setMap('csocials:service', {})
	}
}
