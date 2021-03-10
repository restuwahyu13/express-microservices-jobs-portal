import { Publisher } from '../../utils/util.publisher'

export const setDeleteWorksPublisher = async (data: Record<string, any>): Promise<void> => {
	const deleteWorksPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await deleteWorksPublisher.setMap('dworks:service', data)
	} else {
		await deleteWorksPublisher.setMap('dworks:service', {})
	}
}

export const setUpdateWorksPublisher = async (data: Record<string, any>): Promise<void> => {
	const updateWorksPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await updateWorksPublisher.setMap('uworks:service', data)
	} else {
		await updateWorksPublisher.setMap('uworks:service', {})
	}
}
