import request, { Response } from 'supertest'
import mongoose from 'mongoose'
import { QueueEvents, Worker } from 'bullmq'
import app from '../src/app'

describe('FORGOT.ts', () => {
	beforeEach(() => {
		jest.setTimeout(50000)
	})

	afterAll(async (done) => {
		jest.clearAllTimers()
		await mongoose.connection.close()
		await new Worker('forgot').close()
		await new QueueEvents('forgot').close()
		done()
	})
})
