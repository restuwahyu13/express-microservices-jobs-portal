import { Publisher } from '../../utils/util.publisher'

export const setDeleteVolunteersPublisher = async (data: Record<string, any>): Promise<void> => {
	const deleteVolunteersPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await deleteVolunteersPublisher.setMap('dvolunteers:service', data)
	} else {
		await deleteVolunteersPublisher.setMap('dvolunteers:service', {})
	}
}

export const setUpdateVolunteersPublisher = async (data: Record<string, any>): Promise<void> => {
	const updateVolunteersPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await updateVolunteersPublisher.setMap('uvolunteers:service', data)
	} else {
		await updateVolunteersPublisher.setMap('uvolunteers:service', {})
	}
}
