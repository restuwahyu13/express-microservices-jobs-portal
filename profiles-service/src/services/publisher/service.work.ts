import { Publisher } from '../../utils/util.publisher'

export const setWorksProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const worksProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await worksProfilePublisher.setMap('cworks:service', data)
	} else {
		await worksProfilePublisher.setMap('cworks:service', {})
	}
}
