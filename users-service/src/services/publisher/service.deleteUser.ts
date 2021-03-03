import { Publisher } from '../../utils/util.publisher'

export const setDeleteUserPublisher = async (data: Record<string, any>): Promise<void> => {
	const deleteUserPublisher = new Publisher({ key: 'Delete User' })
	if (Object.keys(data).length > 0 && data) {
		await deleteUserPublisher.setMap('users:delete:service', data)
	} else {
		await deleteUserPublisher.setMap('users:delete:service', {})
	}
}
