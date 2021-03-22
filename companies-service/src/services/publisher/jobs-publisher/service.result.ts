import { Publisher } from '../../../utils/util.publisher'

export const setResultJobsPostCompaniesPublisher = async (data: Record<string, any>): Promise<void> => {
	const resultCompaniesPublisher = new Publisher({ key: 'Result Jobs Post Companies' })
	if (Object.keys(data).length > 0 && data) {
		await resultCompaniesPublisher.setMap('companies:jobs:result:service', data)
	} else {
		await resultCompaniesPublisher.setMap('companies:jobs:result:service', {})
	}
}
