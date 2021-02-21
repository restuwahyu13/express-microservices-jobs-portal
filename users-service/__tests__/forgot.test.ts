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

	it('get statusCode email is valid and forgot password successfully', async (done) => {
		const res: Response = await request(app)
			.post(`/api/v1/user/forgot-password`)
			.send({ email: 'restuwahyu13#zetmail.com' })
			.set('Content-Type', 'application/json')
			.expect(200)

		expect(res.body.method).toEqual('POST')
		expect(res.body.status).toEqual(200)
		expect(res.body.message).toEqual('change new password successfully, please login')
		done()
	})

	it('get statusCode email is not valid', async (done) => {
		const res: Response = await request(app)
			.post(`/api/v1/user/forgot-password`)
			.send({ email: 'restuwahyu13#zetmail.com' })
			.set('Content-Type', 'application/json')
			.expect(400)

		expect(res.body.method).toEqual('POST')
		expect(res.body.status).toEqual(400)
		expect(res.body.errors[0].msg).toEqual('email is not valid')
		done()
	})
})
