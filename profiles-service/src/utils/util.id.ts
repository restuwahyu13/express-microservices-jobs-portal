import IORedis, { Redis } from 'ioredis'

export const getStoreCacheId = async (): Promise<string> => {
	return new Promise((resolve, _) => {
		const ioRedis = new IORedis({
			host: '127.0.0.1',
			port: 6379,
			maxRetriesPerRequest: 50,
			connectTimeout: 5000,
			enableReadyCheck: true,
			enableAutoPipelining: true
		}) as Redis

		ioRedis.get('userId').then((res: string) => resolve(res))
	})
}
