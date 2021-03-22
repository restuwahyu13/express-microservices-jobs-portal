import { Publisher } from '../../../utils/util.publisher'

export const setResultsJobsPostCompaniesPublisher = async (data: Record<string, any>): Promise<void> => {
	const resultsJobsPostCompaniesPublisher = new Publisher({ key: 'Results Jobs Post Companies' })
	if (Object.keys(data).length > 0 && data) {
		await resultsJobsPostCompaniesPublisher.setMap('companies:jobs:results:service', data)
	} else {
		await resultsJobsPostCompaniesPublisher.setMap('companies:jobs:results:service', {})
	}
}
