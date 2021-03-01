import { Publisher } from '../../utils/util.publisher'

export const setDeleteSkillsPublisher = async (data: Record<string, any>): Promise<void> => {
	const deleteSkillsPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await deleteSkillsPublisher.setMap('dskills:service', data)
	} else {
		await deleteSkillsPublisher.setMap('dskills:service', {})
	}
}

export const setUpdateSkillsPublisher = async (data: Record<string, any>): Promise<void> => {
	const updateSkillsPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await updateSkillsPublisher.setMap('uskills:service', data)
	} else {
		await updateSkillsPublisher.setMap('uskills:service', {})
	}
}
