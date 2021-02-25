import IORedis, { Redis } from 'ioredis'

export const setStoreCache = async (data: Record<string, any>): Promise<void> => {
	const ioRedis = new IORedis({
		host: '127.0.0.1',
		port: 6379,
		maxRetriesPerRequest: 50,
		connectTimeout: 5000,
		enableReadyCheck: true,
		enableAutoPipelining: true
	}) as Redis

	await ioRedis.hmset('user:cache', data)
	await ioRedis.expire('user:cache', 24 * 60 * 1000)
}
