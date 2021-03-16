import { Publisher } from '../../../utils/util.publisher'

export const setDeleteJobsPublisher = async (data: Record<string, any>): Promise<void> => {
	const deleteJobsPublisher = new Publisher({ key: 'Jobs Delete' })
	if (Object.keys(data).length > 0 && data) {
		await deleteJobsPublisher.setMap('jobs:delete:service', data)
	} else {
		await deleteJobsPublisher.setMap('jobs:delete:service', {})
	}
}
