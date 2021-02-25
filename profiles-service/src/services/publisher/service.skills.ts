import { Publisher } from '../../utils/util.publisher'

export const setSkillsProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const skillProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await skillProfilePublisher.setMap('cskills:service', data)
	} else {
		await skillProfilePublisher.setMap('cskills:service', {})
	}
}
