import { Publisher } from '../../utils/util.publisher'

export const setCreateWorksPublisher = async (data: Record<string, any>): Promise<void> => {
	const createWorksPublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await createWorksPublisher.setMap('cworks:service', data)
	} else {
		await createWorksPublisher.setMap('cworks:service', {})
	}
}
