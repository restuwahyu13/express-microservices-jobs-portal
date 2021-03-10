import { Publisher } from '../../../utils/util.publisher'

export const setResultCompaniesPublisher = async (data: Record<string, any>): Promise<void> => {
	const resultCompaniesPublisher = new Publisher({ key: 'Result Companies' })
	if (Object.keys(data).length > 0 && data) {
		await resultCompaniesPublisher.setMap('companies:result:service', data)
	} else {
		await resultCompaniesPublisher.setMap('companies:result:service', {})
	}
}
