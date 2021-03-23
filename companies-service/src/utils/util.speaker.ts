import IORedis, { Redis } from 'ioredis'

const ioRedis = new IORedis({
	host: process.env.REDIS_HOST,
	port: +process.env.REDIS_PORT,
	maxRetriesPerRequest: 50,
	connectTimeout: 25000,
	enableReadyCheck: true,
	enableAutoPipelining: true
}) as Redis

export const setPipelineSpeaker = async (evetName: string, data: Record<string, any>): Promise<void> => {
	await ioRedis.hset(evetName, { payload: JSON.stringify(data) })
	await ioRedis.expire(evetName, 1)
}

export const getPipelineSpeaker = (evetName: string): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		const res: Record<string, any> = await ioRedis.hgetall(evetName)
		resolve(JSON.parse(res.payload))
	})
}
