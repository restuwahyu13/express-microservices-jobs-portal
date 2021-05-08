import { Publisher } from '../../../utils/util.publisher'

export const setForgotPublisher = async (data: Record<string, any>): Promise<void> => {
	const forgotPublisher = new Publisher({ key: 'Users Forgot' })
	if (Object.keys(data).length > 0 && data) {
		await forgotPublisher.setMap('users-forgot:service', data)
	} else {
		await forgotPublisher.setMap('users-forgot:service', {})
	}
}
