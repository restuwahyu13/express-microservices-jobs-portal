import { Document } from 'mongoose'

export class LoggerDTO extends Document {
	readonly ipAddress: string
	readonly serviceName: string
	readonly requestMethod: string
	readonly statusCode: string
	readonly routePath: string
	readonly createdAt: any
}
