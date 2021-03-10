import { Publisher } from '../../../utils/util.publisher'

export const setResetPublisher = async (data: Record<string, any>): Promise<void> => {
	const resetPublisher = new Publisher({ key: 'Companies Reset' })
	if (Object.keys(data).length > 0 && data) {
		await resetPublisher.setMap('companies-reset:service', data)
	} else {
		await resetPublisher.setMap('companies-reset:service', {})
	}
}
