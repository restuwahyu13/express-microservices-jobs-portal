import { Publisher } from '../../../utils/util.publisher'

export const setCreateJobsPublisher = async (data: Record<string, any>): Promise<void> => {
	const createJobsPublisher = new Publisher({ key: 'Jobs Create' })
	if (Object.keys(data).length > 0 && data) {
		await createJobsPublisher.setMap('jobs:create:service', data)
	} else {
		await createJobsPublisher.setMap('jobs:create:service', {})
	}
}
