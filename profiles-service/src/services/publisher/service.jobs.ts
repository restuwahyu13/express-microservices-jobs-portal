import { Publisher } from '../../utils/util.publisher'

export const setJobsProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const jobsProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await jobsProfilePublisher.setMap('jobs:service', data)
	} else {
		await jobsProfilePublisher.setMap('jobs:service', {})
	}
}
