import { Publisher } from '../../../utils/util.publisher'

export const setDeleteCompaniesPublisher = async (data: Record<string, any>): Promise<void> => {
	const deleteCompaniesPublisher = new Publisher({ key: 'Delete Companies' })
	if (Object.keys(data).length > 0 && data) {
		await deleteCompaniesPublisher.setMap('companies:delete:service', data)
	} else {
		await deleteCompaniesPublisher.setMap('companies:delete:service', {})
	}
}
