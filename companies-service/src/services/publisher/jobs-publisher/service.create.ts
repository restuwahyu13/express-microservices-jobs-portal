import { Publisher } from '../../../utils/util.publisher'

export const setCreateJobsPostCompaniesPublisher = async (data: Record<string, any>): Promise<void> => {
	const createJobsPostCompaniesPublisher = new Publisher({ key: 'Create Jobs Post Companies' })
	if (Object.keys(data).length > 0 && data) {
		await createJobsPostCompaniesPublisher.setMap('companies:jobs:create:service', data)
	} else {
		await createJobsPostCompaniesPublisher.setMap('companies:jobs:create:service', {})
	}
}
