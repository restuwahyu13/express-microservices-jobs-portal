import { Publisher } from './util.publisher'
import { Subscriber } from './util.subscriber'

export const getResponseSubscriber = (eventName: string): Promise<any> => {
	const getResponseSubscriber = new Subscriber({ key: 'Response' })
	return new Promise((resolve, reject) => {
		getResponseSubscriber
			.getResponse(eventName)
			.then((response) => resolve(response))
			.catch((error) => reject(error))
	})
}

export const setResponsePublisher = async (keyName: string, response: Record<string, any>): Promise<any> => {
	const setResponsePublisher = new Publisher({ key: 'Response' })
	if (response) {
		await setResponsePublisher.setResponse(keyName, response)
	} else {
		await setResponsePublisher.setResponse(keyName, {})
	}
}
