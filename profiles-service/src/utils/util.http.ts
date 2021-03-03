import axios, { AxiosRequestConfig } from 'axios'

export const httpClientRequest = (url: string, configs?: AxiosRequestConfig): Promise<Record<string, any>> => {
	return axios.get(url, configs || {})
}
