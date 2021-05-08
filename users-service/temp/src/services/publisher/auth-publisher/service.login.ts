import { Publisher } from '../../../utils/util.publisher'

export const setLoginPublisher = async (data: Record<string, any>): Promise<void> => {
	const loginPublisher = new Publisher({ key: 'Users Login' })
	if (Object.keys(data).length > 0 && data) {
		await loginPublisher.setMap('users-login:service', data)
	} else {
		await loginPublisher.setMap('users-login:service', {})
	}
}
