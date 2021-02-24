import { Publisher } from '../../utils/util.publisher'

export const setDeletePublisher = async (data: Record<string, any>): Promise<void> => {
	const deletePublisher = new Publisher({ key: 'Delete' })
	if (Object.keys(data).length > 0 && data) {
		await deletePublisher.setMap('delete:service', { ...data })
	} else {
		await deletePublisher.setMap('delete:service', {})
	}
}
