import { Publisher } from '../../utils/util.publisher'

export const setCreateVolunteersPublisher = async (data: Record<string, any>): Promise<void> => {
	const createVolunteersPublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await createVolunteersPublisher.setMap('cvolunteers:service', data)
	} else {
		await createVolunteersPublisher.setMap('cvolunteers:service', {})
	}
}
