import { Publisher } from '../../../utils/util.publisher'

export const setResultJobsPostCompaniesPublisher = async (data: Record<string, any>): Promise<void> => {
	const resultJobsPostCompaniesPublisher = new Publisher({ key: 'Result Jobs Post Companies' })
	if (Object.keys(data).length > 0 && data) {
		await resultJobsPostCompaniesPublisher.setMap('companies:jobs:result:service', data)
	} else {
		await resultJobsPostCompaniesPublisher.setMap('companies:jobs:result:service', {})
	}
}
