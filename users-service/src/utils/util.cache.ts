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
	await ioRedis.hmset(evetName, JSON.stringify({ payload: data }))
	await ioRedis.setex('cacheFromProfile', 60, evetName)
}

export const getStoreCache = (): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		const getEvent = await ioRedis.get('cacheToProfile')
		const res: Record<string, any> = await ioRedis.hgetall(getEvent)
		await ioRedis.expire(getEvent, 60)
		resolve(JSON.parse(res.payload))
	})
}
