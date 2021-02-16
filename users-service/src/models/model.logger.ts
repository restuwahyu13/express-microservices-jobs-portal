import * as mongoose from 'mongoose'
import { LoggerDTO } from '../dto/dto.logger'

const Schema: mongoose.Schema = new mongoose.Schema({
	ipAddress: {
		type: String,
		trim: true,
		required: [true, 'ipAddress is required']
	},
	serviceName: {
		type: String,
		trim: true,
		required: [true, 'serviceName is required']
	},
	requestMethod: {
		type: String,
		trim: true,
		required: [true, 'requestMethod is required']
	},
	statusCode: {
		type: Number,
		trim: true,
		required: [true, 'statusCode is required']
	},
	routePath: {
		type: String,
		trim: true,
		required: [true, 'routePath is required']
	},
	createdAt: {
		type: String,
		trim: true,
		required: [true, 'createdAt is required']
	}
})

export const LoggerSchema = mongoose.model<LoggerDTO>('loggerService', Schema)
