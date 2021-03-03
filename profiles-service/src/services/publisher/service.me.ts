import { Publisher } from '../../utils/util.publisher'

export const setCreateMePublisher = async (data: Record<string, any>): Promise<void> => {
	const createMePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await createMePublisher.setMap('cprofile:service', data)
	} else {
		await createMePublisher.setMap('cprofile:service', {})
	}
}

export const setCreateSubMePublisher = async (data: Record<string, any>): Promise<void> => {
	const createSubMePublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await createSubMePublisher.setMap('csubprofile:service', data)
	} else {
		await createSubMePublisher.setMap('csubprofile:service', {})
	}
}

export const setResultMePublisher = async (data: Record<string, any>): Promise<void> => {
	const resultMePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await resultMePublisher.setMap('rprofile:service', data)
	} else {
		await resultMePublisher.setMap('rprofile:service', {})
	}
}

export const setDeletetMePublisher = async (data: Record<string, any>): Promise<void> => {
	const resultMePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await resultMePublisher.setMap('dprofile:service', data)
	} else {
		await resultMePublisher.setMap('dprofile:service', {})
	}
}
