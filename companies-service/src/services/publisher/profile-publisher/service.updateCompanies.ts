import { Publisher } from '../../../utils/util.publisher'

export const setUpdateCompaniesPublisher = async (data: Record<string, any>): Promise<void> => {
	const updateCompaniesPublisher = new Publisher({ key: 'Update Companies' })
	if (Object.keys(data).length > 0 && data) {
		await updateCompaniesPublisher.setMap('companies:update:service', data)
	} else {
		await updateCompaniesPublisher.setMap('companies:update:service', {})
	}
}
