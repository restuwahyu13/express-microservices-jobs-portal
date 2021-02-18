import { Worker, QueueEvents } from 'bullmq'
import consola from 'consola'
import { ISubscriber } from '../interface/interface.subscriber'

export class Subscriber {
	private serviceName: string
	private listenerName: string
	private queueEvent: InstanceType<typeof QueueEvents>

	constructor(options: Readonly<ISubscriber>) {
		this.serviceName = options.serviceName
		this.listenerName = options.listenerName
		this.queueEvent = new QueueEvents(this.serviceName)
	}

	private _worker(): void {
		new Worker(
			this.serviceName,
			async (job) => {
				if (job.name == this.listenerName) {
					this.queueEvent.emit(this.listenerName, JSON.stringify({ data: job.data }))
				}
			},
			{ limiter: { duration: 3000, max: 25 } }
		)
	}

	private _notifications(): void {
		this._worker()
		this.queueEvent.on('completed', (job) => consola.success(`${this.listenerName} completed ${job.jobId}`))
		this.queueEvent.on('waiting', (job) => consola.info(`${this.listenerName} waiting ${job.jobId}`))
		this.queueEvent.on('active', (job) => consola.info(`${this.listenerName} active ${job.jobId}`))
		this.queueEvent.on('failed', (job) => consola.error(`${this.listenerName} failed ${job.jobId}`))
	}

	listener(): Promise<Record<string, any>> {
		this._notifications()
		return new Promise((resolve, _) => {
			this.queueEvent.once(this.listenerName, async (data) => {
				resolve(JSON.parse(data).data)
			})
		})
	}
}

module.exports = { Subscriber }
