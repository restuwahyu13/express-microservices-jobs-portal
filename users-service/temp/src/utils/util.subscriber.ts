import IORedis, { Redis } from 'ioredis'
import chalk from 'chalk'
import { Publisher } from '../utils/util.publisher'
import { ISubscriber } from '../interface/interface.subscriber'

export class Subscriber {
	private keyTo: string
	private keyFrom: string
	private uniqueId: string

	constructor(config: Readonly<ISubscriber>) {
		this.keyTo = config.key
		this.keyFrom = Publisher.get().key
		this.uniqueId = Publisher.get().unique
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
		}) as Redis

		return ioRedis
	}

	public async getString(keyName: string): Promise<any> {
		if (this.keyTo == this.keyFrom) {
			const ioRedis = this.redisConnect() as Redis
			const response: string = await ioRedis.get(`${keyName}:${this.uniqueId}`)
			if (response) {
				return Promise.resolve(response)
			}
			return {}
		} else {
			return Promise.reject(chalk.red(new Error(`invalid key Subscriber: ${this.keyTo} and Publisher: ${this.keyFrom}`)))
		}
	}

	public async getMap(keyName: string): Promise<any> {
		if (this.keyTo == this.keyFrom) {
			const ioRedis = this.redisConnect() as Redis
			const response: Record<string, any> = await ioRedis.hgetall(`${keyName}:${this.uniqueId}`)
			if (response) {
				return Promise.resolve(JSON.parse(response.payload))
			}
			return {}
		} else {
			return Promise.reject(chalk.red(new Error(`invalid key Subscriber: ${this.keyTo} and Publisher: ${this.keyFrom}`)))
		}
	}

	public async getResponse(): Promise<any> {
		const ioRedis = this.redisConnect() as Redis
		const response: Record<string, any> = await ioRedis.hgetall(`response:speaker:${this.uniqueId}`)
		if (response) {
			return Promise.resolve(JSON.parse(response.response))
		}
		return {}
	}
}
