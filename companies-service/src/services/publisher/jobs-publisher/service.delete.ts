import { Publisher } from '../../../utils/util.publisher'

export const setDeleteJobsPostCompaniesPublisher = async (data: Record<string, any>): Promise<void> => {
	const deleteJobsPostCompaniesPublisher = new Publisher({ key: 'Delete Jobs Post Companies' })
	if (Object.keys(data).length > 0 && data) {
		await deleteJobsPostCompaniesPublisher.setMap('companies:jobs:delete:service', data)
	} else {
		await deleteJobsPostCompaniesPublisher.setMap('companies:jobs:delete:service', {})
	}
}
