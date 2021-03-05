import { Publisher } from '../../../utils/util.publisher'

export const setActivationPublisher = async (data: Record<string, any>): Promise<void> => {
	const activationPublisher = new Publisher({ key: 'Activation' })
	if (Object.keys(data).length > 0 && data) {
		await activationPublisher.setMap('activation:service', data)
	} else {
		await activationPublisher.setMap('activation:service', {})
	}
}
