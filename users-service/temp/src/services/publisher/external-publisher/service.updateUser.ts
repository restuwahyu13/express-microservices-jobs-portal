import { Publisher } from '../../../utils/util.publisher'

export const setUpdateUserPublisher = async (data: Record<string, any>): Promise<void> => {
	const updateUserPublisher = new Publisher({ key: 'Update Users' })
	if (Object.keys(data).length > 0 && data) {
		await updateUserPublisher.setMap('users:update:service', data)
	} else {
		await updateUserPublisher.setMap('users:update:service', {})
	}
}
