import IORedis, { Redis } from 'ioredis'
import { v4 as uuid } from 'uuid'
import { IPublisher } from '../interface/interface.publisher'

export class Publisher {
	private static key: string
	private static unique: string

	constructor(configs: Readonly<IPublisher>) {
		Publisher.key = configs.key
		Publisher.unique = uuid()
		Publisher.set({ key: configs.key, unique: Publisher.unique })
	}

	public static get(): Record<string, any> {
		const options: Record<string, any> = {
			key: Publisher.key,
			unique: Publisher.unique
		}
		return options
	}

	private static set(config: Record<string, any>): void {
		Publisher.key = config.key
		Publisher.unique = config.unique
	}

	private redisConnect(): Redis {
		const ioRedis = new IORedis({
			host: '127.0.0.1',
			port: 6379,
			maxRetriesPerRequest: 50,
			connectTimeout: 5000,
			enableReadyCheck: true,
			enableAutoPipelining: true,
			db: 0
		}) as IORedis.Redis

		return ioRedis
	}

	public async setString(keyName: string, data: string): Promise<void> {
		const ioRedis = this.redisConnect() as Redis
		await ioRedis.set(`${keyName}:${Publisher.get().unique}`, data)
		await ioRedis.expire(`${keyName}:${Publisher.get().unique}`, 30)
	}

	public async setMap(keyName: string, data: Record<string, any>): Promise<void> {
		const ioRedis = this.redisConnect() as Redis
		await ioRedis.hset(`${keyName}:${Publisher.get().unique}`, { payload: JSON.stringify(data) })
		await ioRedis.expire(`${keyName}:${Publisher.get().unique}`, 30)
	}

	public async setResponse(data: Record<string, any>): Promise<void> {
		const ioRedis = this.redisConnect() as Redis
		await ioRedis.hset(`response:speaker:${Publisher.get().unique}`, { response: JSON.stringify(data) })
		await ioRedis.expire(`response:speaker:${Publisher.get().unique}`, 30)
	}
}
