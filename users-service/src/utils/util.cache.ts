import IORedis, { Redis } from 'ioredis'

const ioRedis = new IORedis({
	host: '127.0.0.1',
	port: 6379,
	maxRetriesPerRequest: 50,
	connectTimeout: 5000,
	enableReadyCheck: true,
	enableAutoPipelining: true
}) as Redis

export const setStoreCache = async (evetName: string, data: Record<string, any>): Promise<void> => {
	await ioRedis.hset(evetName, { payload: JSON.stringify(data) })
	await ioRedis.expire(evetName, 1)
}

export const getStoreCache = (evetName: string): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		const res: Record<string, any> = await ioRedis.hgetall(evetName)
		resolve(JSON.parse(res.payload))
	})
}
