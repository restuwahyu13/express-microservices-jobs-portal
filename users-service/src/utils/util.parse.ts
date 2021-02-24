export const toJson = (data: any): string => {
	return JSON.stringify({ data: data })
}

export const toObject = (data: any): Record<string, any> => {
	return JSON.parse(data).data
}
