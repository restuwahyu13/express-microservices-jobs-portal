import request, { Response } from 'supertest'
import mongoose from 'mongoose'
import { QueueEvents, Worker } from 'bullmq'
import app from '../src/app'

describe('ACTIVATION.ts', () => {
	let accessToken

	beforeEach(() => {
		jest.setTimeout(50000)
		accessToken =
			'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SWpZd016RXhaRFkwWXpWaVpqbGpNMkZoTjJVMVlqYzFNaUlzSW1WdFlXbHNJam9pWVd4a2FXdG9ZVzR4TTBCbmNuSXViR0VpTENKcFlYUWlPakUyTVRNNE16azFOemtzSW1WNGNDSTZNVFl4TXpnek9UZzNPWDAubHIwclRCdmZKdEVsN3VaeGFaUldWQ2xjdGc0c05saTg2MTZSbUZHOGtZcw=='
	})

	afterAll(async (done) => {
		jest.clearAllTimers()
		await mongoose.connection.close()
		await new Worker('activation').close()
		await new QueueEvents('activation').close()
		done()
	})

	// it('get login success statusCode', async (done) => {
	// 	const res: Response = await request(app)
	// 		.post('/api/v1/user/activation')
	// 		.send({ email: 'aldikhan13@grr.la', password: 'aldikhan13' })
	// 		.set('Content-Type', 'application/json')

	// 	expect(res.body.method).toBe('POST')
	// 	expect(res.body.status).toEqual(200)
	// 	expect(res.body.message).toEqual('login successfully')
	// 	done()
	// })

	it('get activation token expired or invalid token statusCode', async (done) => {
		const res: Response = await request(app).get(`/api/v1/user/activation/${accessToken}`).set('Content-Type', 'application/json')

		expect(res.body.method).toBe('GET')
		expect(res.body.status).toEqual(401)
		expect(res.body.message).toEqual('activation token is not valid or expired, please resend new token')
		done()
	})

	it('check header response is json', async (done) => {
		const res: Response = await request(app).get(`/api/v1/user/activation/${accessToken}`).set('Content-Type', 'application/json')

		expect(res.body.status).toEqual(401)
		expect(res.header['content-type']).toMatch(/json/)
		done()
	})
})
