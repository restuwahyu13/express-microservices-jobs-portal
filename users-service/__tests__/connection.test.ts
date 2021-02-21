import { mongooseConnection } from '../src/utils/util.connection'
import mongoose from 'mongoose'
import { QueueEvents, Worker } from 'bullmq'

describe('CONNECTION.TS', () => {
	beforeEach((done) => {
		mongooseConnection()
		done()
	})

	afterAll(async (done) => {
		await mongoose.connection.close()
		await new Worker('activation').close()
		await new QueueEvents('activation').close()
		done()
	})

	it('get response if connection status is connected', () => {
		expect(mongoose.STATES.connected === 1).toBeTruthy()
	})

	it('get response if connection status is disconnected', () => {
		mongoose.disconnect()
		expect(mongoose.STATES.disconnected === 0).toBeTruthy()
	})
})
