import { Publisher } from '../../utils/util.publisher'

export const setCreateProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const createProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await createProfilePublisher.setMap('cprofile:service', data)
	} else {
		await createProfilePublisher.setMap('cprofile:service', {})
	}
}

export const setCreateSubProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const createSubProfilePublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await createSubProfilePublisher.setMap('csubprofile:service', data)
	} else {
		await createSubProfilePublisher.setMap('csubprofile:service', {})
	}
}

export const setResultProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const resultProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await resultProfilePublisher.setMap('rprofile:service', data)
	} else {
		await resultProfilePublisher.setMap('rprofile:service', {})
	}
}

export const setDeleteSubProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const resultProfilePublisher = new Publisher({ key: 'Sub Profile' })
	if (Object.keys(data).length > 0 && data) {
		await resultProfilePublisher.setMap('dsubprofile:service', data)
	} else {
		await resultProfilePublisher.setMap('dsubprofile:service', {})
	}
}
