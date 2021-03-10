import { Publisher } from '../../utils/util.publisher'

export const setDeleteAppreciationsPublisher = async (data: Record<string, any>): Promise<void> => {
	const deleteAppreciationsPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await deleteAppreciationsPublisher.setMap('dappreciations:service', data)
	} else {
		await deleteAppreciationsPublisher.setMap('dappreciations:service', {})
	}
}

export const setUpdateAppreciationsPublisher = async (data: Record<string, any>): Promise<void> => {
	const updateAppreciationsPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await updateAppreciationsPublisher.setMap('uappreciations:service', data)
	} else {
		await updateAppreciationsPublisher.setMap('uappreciations:service', {})
	}
}
