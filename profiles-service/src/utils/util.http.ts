import axios, { Method } from 'axios'

export const httpClientRequest = (url: string, method: string, headers?: Record<string, string>) => {
	return axios({
		url: url,
		method: method.toLowerCase() as Method,
		headers: headers || {}
	})
}
