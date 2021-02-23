export interface ISubscriber {
	serviceName: string
	listenerName: string
	connections: Array<Record<string, any>>
}
