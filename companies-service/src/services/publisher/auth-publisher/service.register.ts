import { Publisher } from '../../../utils/util.publisher'

export const setRegisterPublisher = async (data: Record<string, any>): Promise<void> => {
	const registerPublisher = new Publisher({ key: 'Companies Register' })
	if (Object.keys(data).length > 0 && data) {
		await registerPublisher.setMap('companies-register:service', data)
	} else {
		await registerPublisher.setMap('companies-register:service', {})
	}
}
