import { Publisher } from '../../utils/util.publisher'

export const setDeleteJobsPublisher = async (data: Record<string, any>): Promise<void> => {
	const deleteJobsublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await deleteJobsublisher.setMap('djobs:service', data)
	} else {
		await deleteJobsublisher.setMap('djobs:service', {})
	}
}

export const setUpdateJobsPublisher = async (data: Record<string, any>): Promise<void> => {
	const updateJobsublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await updateJobsublisher.setMap('ujobs:service', data)
	} else {
		await updateJobsublisher.setMap('ujobs:service', {})
	}
}
