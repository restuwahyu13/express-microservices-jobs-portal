import { Publisher } from '../../../utils/util.publisher'

export const setUpdateJobsPostCompaniesPublisher = async (data: Record<string, any>): Promise<void> => {
	const updateJobsPostCompaniesPublisher = new Publisher({ key: 'Update Jobs Post Companies' })
	if (Object.keys(data).length > 0 && data) {
		await updateJobsPostCompaniesPublisher.setMap('companies:jobs:update:service', data)
	} else {
		await updateJobsPostCompaniesPublisher.setMap('companies:jobs:update:service', {})
	}
}
