import { Publisher } from '../../../utils/util.publisher'

export const setUpdateJobsPublisher = async (data: Record<string, any>): Promise<void> => {
	const updateJobsPublisher = new Publisher({ key: 'Jobs Update' })
	if (Object.keys(data).length > 0 && data) {
		await updateJobsPublisher.setMap('jobs:update:service', data)
	} else {
		await updateJobsPublisher.setMap('jobs:update:service', {})
	}
}
