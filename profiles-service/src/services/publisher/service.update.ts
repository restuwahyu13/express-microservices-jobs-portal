import { Publisher } from '../../utils/util.publisher'

export const setUpdatePublisher = async (data: Record<string, any>): Promise<void> => {
	const updatePublisher = new Publisher({ key: 'Update' })
	if (Object.keys(data).length > 0 && data) {
		await updatePublisher.setMap('update:service', { ...data })
	} else {
		await updatePublisher.setMap('update:service', {})
	}
}
