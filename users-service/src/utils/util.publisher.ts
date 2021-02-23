import { Queue } from 'bullmq'
import Redis from 'ioredis'
import { IPublisher } from '../interface/interface.publisher'

export class Publisher {
	private serviceName: string
	private speakerName: string
	private connections: Array<Record<string, any>>

	constructor(option: Readonly<IPublisher>) {
		this.serviceName = option.serviceName
		this.speakerName = option.speakerName
		this.connections = option.connections
	}

	queue(): InstanceType<typeof Queue> {
		const clusterConnection = new Redis.Cluster(this.connections) as Redis.Cluster
		const serviceName = new Queue(this.serviceName, {
			connection: clusterConnection,
			prefix: '{bullMQ}',
			limister: { duration: 1000, max: 25 }
		}) as Queue<any, any, string>
		return serviceName
	}

	async speaker(data: Record<string, any>, options?: Record<string, any>): Promise<void> {
		await this.queue().add(this.speakerName, { ...data }, { ...options })
	}
}
