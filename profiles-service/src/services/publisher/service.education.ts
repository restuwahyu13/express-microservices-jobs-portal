import { Publisher } from '../../utils/util.publisher'

export const setDeleteEducationsPublisher = async (data: Record<string, any>): Promise<void> => {
	const deleteEducationsPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await deleteEducationsPublisher.setMap('deducations:service', data)
	} else {
		await deleteEducationsPublisher.setMap('deducations:service', {})
	}
}

export const setUpdateEducationsPublisher = async (data: Record<string, any>): Promise<void> => {
	const updateEducationsPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await updateEducationsPublisher.setMap('ueducations:service', data)
	} else {
		await updateEducationsPublisher.setMap('ueducations:service', {})
	}
}
