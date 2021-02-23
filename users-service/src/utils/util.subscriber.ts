import Redis from 'ioredis'
import { Worker, QueueEvents } from 'bullmq'
import consola from 'consola'
import { ISubscriber } from '../interface/interface.subscriber'

export class Subscriber {
	private serviceName: string
	private listenerName: string
	private queueEvent: InstanceType<typeof QueueEvents>
	private options: Record<string, any>

	constructor(option: Readonly<ISubscriber>) {
		this.serviceName = option.serviceName
		this.listenerName = option.listenerName
		this.options = option.options
		this.queueEvent = new QueueEvents(this.serviceName)
	}

	private _worker(): void {
		const connection = new Redis(this.options.port, this.options.host) as Redis.Redis
		new Worker(
			this.serviceName,
			async (job) => {
				if (job.name == this.listenerName) {
					await this.queueEvent.emit(this.listenerName, JSON.stringify({ data: job.data }))
					return job.name
				}
			},
			{ connection, limiter: { duration: 1000, max: 25 } }
		) as Worker<any, any, string>
	}

	private async _notifications(): Promise<void> {
		await this._worker()
		this.queueEvent.on('completed', (job) => consola.success(`${this.listenerName} completed ${job.jobId}`))
		this.queueEvent.on('waiting', (job) => consola.info(`${this.listenerName} waiting ${job.jobId}`))
		this.queueEvent.on('active', (job) => consola.info(`${this.listenerName} active ${job.jobId}`))
		this.queueEvent.on('failed', (job) => consola.error(`${this.listenerName} failed ${job.jobId}`))
	}

	async listener(): Promise<Record<string, any>> {
		await this._notifications()
		return new Promise((resolve, _) => {
			this.queueEvent.on(this.listenerName, async (data) => {
				resolve(JSON.parse(data).data)
			})
		})
	}
}

module.exports = { Subscriber }
