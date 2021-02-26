import { Publisher } from '../../utils/util.publisher'

export const setCreateEducationPublisher = async (data: Record<string, any>): Promise<void> => {
	const createEducationPublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await createEducationPublisher.setMap('ceducations:service', data)
	} else {
		await createEducationPublisher.setMap('ceducations:service', {})
	}
}
