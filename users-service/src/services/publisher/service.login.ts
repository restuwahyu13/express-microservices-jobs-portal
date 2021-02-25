import { Publisher } from '../../utils/util.publisher'

export const setLoginPublisher = async (data: Record<string, any>): Promise<any> => {
	const loginPublisher = new Publisher({ key: 'Login' })
	if (Object.keys(data).length > 0 && data) {
		await loginPublisher.setMap('login:service', data)
	} else {
		await loginPublisher.setMap('login:service', {})
	}
}
