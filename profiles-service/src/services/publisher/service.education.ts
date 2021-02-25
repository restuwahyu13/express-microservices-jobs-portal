import { Publisher } from '../../utils/util.publisher'

export const setEducationProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const educationProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await educationProfilePublisher.setMap('education:service', data)
	} else {
		await educationProfilePublisher.setMap('education:service', {})
	}
}
