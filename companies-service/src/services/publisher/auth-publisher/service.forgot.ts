import { Publisher } from '../../../utils/util.publisher'

export const setForgotPublisher = async (data: Record<string, any>): Promise<void> => {
	const forgotPublisher = new Publisher({ key: 'Companies Forgot' })
	if (Object.keys(data).length > 0 && data) {
		await forgotPublisher.setMap('companies-forgot:service', data)
	} else {
		await forgotPublisher.setMap('companies-forgot:service', {})
	}
}
