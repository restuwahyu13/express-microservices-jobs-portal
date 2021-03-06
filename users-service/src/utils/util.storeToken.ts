import IORedis from 'ioredis'

const ioRedis = new IORedis({
	host: process.env.REDIS_HOST || 'localhost',
	port: +process.env.REDIS_PORT || 6379,
	maxRetriesPerRequest: 50,
	connectTimeout: 5000,
	enableReadyCheck: true,
	enableAutoPipelining: true,
	db: 5
}) as IORedis.Redis

export const setStoreToken = async (data: Record<string, any>, typeExpired: string, expired: number): Promise<void> => {
	switch (typeExpired) {
		case 'minute':
			await ioRedis.setex(`token-${data.token}`, expired * 60, JSON.stringify(data))
			break
		case 'hour':
			await ioRedis.setex(`token-${data.token}`, expired * 60 * 60, JSON.stringify(data))
			break
	}
}

export const getStoreToken = async (token: string): Promise<Record<string, any>> => {
	const expired = await ioRedis.ttl(`token-${token}`)
	const result = await ioRedis.get(`token-${token}`)
	return Promise.resolve({ expired, data: JSON.parse(result) })
}
