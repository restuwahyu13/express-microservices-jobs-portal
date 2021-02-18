import { Queue } from 'bullmq'
import { IPublisher } from '../interface/interface.publisher'

export class Publisher {
	private serviceName: string
	private speakerName: string

	constructor(options: Readonly<IPublisher>) {
		this.serviceName = options.serviceName
		this.speakerName = options.speakerName
	}

	queue(): InstanceType<typeof Queue> {
		const serviceName = new Queue(this.serviceName)
		return serviceName
	}

	async speaker(data: Record<string, any>, options?: Record<string, any>): Promise<void> {
		await this.queue().add(this.speakerName, { ...data }, { ...options })
	}
}
