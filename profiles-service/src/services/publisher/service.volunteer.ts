import { Publisher } from '../../utils/util.publisher'

export const setVolunteerProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const volunteerProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await volunteerProfilePublisher.setArrayMap('volunteer:service', { ...data })
	} else {
		await volunteerProfilePublisher.setArrayMap('volunteer:service', {})
	}
}
