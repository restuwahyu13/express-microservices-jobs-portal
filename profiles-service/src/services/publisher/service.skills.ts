import { Publisher } from '../../utils/util.publisher'

export const setCreateSkillsPublisher = async (data: Record<string, any>): Promise<void> => {
	const createSkillsPublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await createSkillsPublisher.setMap('cskills:service', data)
	} else {
		await createSkillsPublisher.setMap('cskills:service', {})
	}
}
