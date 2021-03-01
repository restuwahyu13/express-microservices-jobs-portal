import { Publisher } from '../../utils/util.publisher'

export const setDeleteSocialsPublisher = async (data: Record<string, any>): Promise<void> => {
	const deleteSocialsPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await deleteSocialsPublisher.setMap('usocials:service', data)
	} else {
		await deleteSocialsPublisher.setMap('usocials:service', {})
	}
}

export const setUpdateSocialsPublisher = async (data: Record<string, any>): Promise<void> => {
	const updateSocialsPublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await updateSocialsPublisher.setMap('usocials:service', data)
	} else {
		await updateSocialsPublisher.setMap('usocials:service', {})
	}
}
