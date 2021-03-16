import { Publisher } from '../../../utils/util.publisher'

export const setResultJobsPublisher = async (data: Record<string, any>): Promise<void> => {
	const resultJobsPublisher = new Publisher({ key: 'Jobs Result' })
	if (Object.keys(data).length > 0 && data) {
		await resultJobsPublisher.setMap('jobs:result:service', data)
	} else {
		await resultJobsPublisher.setMap('jobs:result:service', {})
	}
}
