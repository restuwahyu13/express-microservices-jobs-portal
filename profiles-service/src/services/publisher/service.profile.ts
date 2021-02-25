import { Publisher } from '../../utils/util.publisher'

export const setCreatePublisher = async (data: Record<string, any>): Promise<void> => {
	const createPublisher = new Publisher({ key: 'Create' })
	if (Object.keys(data).length > 0 && data) {
		await createPublisher.setMap('create:service', { ...data })
	} else {
		await createPublisher.setMap('create:service', {})
	}
}
