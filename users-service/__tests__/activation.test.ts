import request, { Response } from 'supertest'
import mongoose from 'mongoose'
import { QueueEvents, Worker } from 'bullmq'
import app from '../src/app'

describe('ACTIVATION.ts', () => {
	let accessToken
	let newAccessToken

	beforeEach(() => {
		jest.setTimeout(50000)
		accessToken =
			'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SWpZd016RXhaRFkwWXpWaVpqbGpNMkZoTjJVMVlqYzFNaUlzSW1WdFlXbHNJam9pWVd4a2FXdG9ZVzR4TTBCbmNuSXViR0VpTENKcFlYUWlPakUyTVRNNE16azFOemtzSW1WNGNDSTZNVFl4TXpnek9UZzNPWDAubHIwclRCdmZKdEVsN3VaeGFaUldWQ2xjdGc0c05saTg2MTZSbUZHOGtZcw=='
		newAccessToken =
			'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SWpZd016SXdNV1V5T0RBMk1UZG1ObUZtWm1Jd01qRmxZeUlzSW1WdFlXbHNJam9pYTJGdFlXd3hNMEJuY25JdWJHRWlMQ0pwWVhRaU9qRTJNVE00T1RBd01UZ3NJbVY0Y0NJNk1UWXlNVFkyTmpBeE9IMC5oVzY0ZERHTlRtc1lOMUFfRGU3bEhaUW40VHRoX3M0NTgwbVIzbkdjMno0'
	})

	afterAll(async (done) => {
		jest.clearAllTimers()
		await mongoose.connection.close()
		await new Worker('activation').close()
		await new QueueEvents('activation').close()
		done()
	})

	it('get statusCode account has been active', async (done) => {
		const res: Response = await request(app)
			.get(`/api/v1/user/activation/${newAccessToken}`)
			.set('Content-Type', 'application/json')

		expect(res.body.method).toBe('GET')
		expect(res.body.status).toEqual(200)
		expect(res.body.message).toEqual('user account has been active, please login')
		done()
	})

	it('get statusCode activation token expired or invalid token', async (done) => {
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
