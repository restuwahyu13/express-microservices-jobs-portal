import { Publisher } from '../../../utils/util.publisher'

export const setRegisterPublisher = async (data: Record<string, any>): Promise<void> => {
	const registerPublisher = new Publisher({ key: 'Users Register' })
	if (Object.keys(data).length > 0 && data) {
		await registerPublisher.setMap('users-register:service', data)
	} else {
		await registerPublisher.setMap('users-register:service', {})
	}
}
