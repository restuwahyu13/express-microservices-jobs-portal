import IORedis, { Redis } from 'ioredis'

export const getStoreCache = async (): Promise<string> => {
	return new Promise((resolve, _) => {
		const ioRedis = new IORedis({
			host: '127.0.0.1',
			port: 6379,
			maxRetriesPerRequest: 50,
			connectTimeout: 5000,
			enableReadyCheck: true,
			enableAutoPipelining: true
		}) as Redis

		ioRedis.hgetall('user:cache').then((res: any) => resolve(res))
	})
}
