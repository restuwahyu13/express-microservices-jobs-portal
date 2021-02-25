import { Publisher } from '../../utils/util.publisher'

export const setForgotPublisher = async (data: Record<string, any>): Promise<void> => {
	const forgotPublisher = new Publisher({ key: 'Forgot' })
	if (Object.keys(data).length > 0 && data) {
		await forgotPublisher.setMap('forgot:service', data)
	} else {
		await forgotPublisher.setMap('forgot:service', {})
	}
}
