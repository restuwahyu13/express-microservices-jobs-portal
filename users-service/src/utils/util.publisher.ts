import { Queue } from 'bullmq'
import Redis from 'ioredis'
import { IPublisher } from '../interface/interface.publisher'

export class Publisher {
	private serviceName: string
	private speakerName: string
	private options: Record<string, any>

	constructor(option: Readonly<IPublisher>) {
		this.serviceName = option.serviceName
		this.speakerName = option.speakerName
		this.options = option.options
	}

	queue(): InstanceType<typeof Queue> {
		const connection = new Redis(this.options.port, this.options.host) as Redis.Redis
		const serviceName = new Queue(this.serviceName, { connection }) as Queue<any, any, string>
		return serviceName
	}

	async speaker(data: Record<string, any>, options?: Record<string, any>): Promise<void> {
		await this.queue().add(this.speakerName, { ...data }, { ...options })
	}
}
