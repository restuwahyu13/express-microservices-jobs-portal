import IORedis, { Redis } from 'ioredis'

export const setStoreCacheId = async (id: string): Promise<void> => {
	const ioRedis = new IORedis({
		host: '127.0.0.1',
		port: 6379,
		maxRetriesPerRequest: 50,
		connectTimeout: 5000,
		enableReadyCheck: true,
		enableAutoPipelining: true
	}) as Redis

	await ioRedis.set('userId', id)
	await ioRedis.expire('userId', 60 * 10)
}
