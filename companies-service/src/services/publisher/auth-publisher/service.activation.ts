import { Publisher } from '../../../utils/util.publisher'

export const setActivationPublisher = async (data: Record<string, any>): Promise<void> => {
	const activationPublisher = new Publisher({ key: 'Companies Activation' })
	if (Object.keys(data).length > 0 && data) {
		await activationPublisher.setMap('companies-activation:service', data)
	} else {
		await activationPublisher.setMap('companies-activation:service', {})
	}
}
