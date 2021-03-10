import { Publisher } from '../../../utils/util.publisher'

export const setResendPublisher = async (data: Record<string, any>): Promise<void> => {
	const resendPublisher = new Publisher({ key: 'Companies Resend' })
	if (Object.keys(data).length > 0 && data) {
		await resendPublisher.setMap('companies-resend:service', data)
	} else {
		await resendPublisher.setMap('companies-resend:service', {})
	}
}
