import request, { Response } from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app'

describe('ACTIVATION.ts', () => {
	let accessToken
	let newAccessToken

	beforeEach(() => {
		jest.setTimeout(50000)
		accessToken =
			'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SWpZd016RXhaRFkwWXpWaVpqbGpNMkZoTjJVMVlqYzFNaUlzSW1WdFlXbHNJam9pWVd4a2FXdG9ZVzR4TTBCbmNuSXViR0VpTENKcFlYUWlPakUyTVRNNE16azFOemtzSW1WNGNDSTZNVFl4TXpnek9UZzNPWDAubHIwclRCdmZKdEVsN3VaeGFaUldWQ2xjdGc0c05saTg2MTZSbUZHOGtZcw=='
		newAccessToken =
			'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SWpZd016WTJOR1l6Wm1ZNVpESTROemN4Wm1JeVlqUmpNU0lzSW1WdFlXbHNJam9pYldGeWJHVjVRR2R5Y2k1c1lTSXNJbWxoZENJNk1UWXhOREUzTnpVeU15d2laWGh3SWpveE5qUTFOek0xTVRJemZRLjJaWWJhdE9iVGRpakRwTG5tNUlCMmFmUkZfVFhOU003aHRpWElHLTIyckU='
	})

	afterAll(async (done) => {
		jest.clearAllTimers()
		await mongoose.connection.close()
		done()
	})

	it('get response if account has been active', async (done) => {
		const res: Response = await request(app)
			.get(`/api/v1/user/activation/${newAccessToken}`)
			.set('Content-Type', 'application/json')
			.expect(400)

		expect(res.body.method).toBe('GET')
		expect(+res.body.status).toEqual(400)
		expect(res.body.message).toEqual('user account has been active, please login')
		done()
	})

	it('get response if activation token expired or invalid token', async (done) => {
		const res: Response = await request(app)
			.get(`/api/v1/user/activation/${accessToken}`)
			.set('Content-Type', 'application/json')
			.expect(401)

		expect(res.body.method).toBe('GET')
		expect(res.body.status).toEqual(401)
		expect(res.body.message).toEqual('activation token is not valid or expired, please resend new token')
		done()
	})

	it('get response if header response is json', async (done) => {
		const res: Response = await request(app)
			.get(`/api/v1/user/activation/${accessToken}`)
			.set('Content-Type', 'application/json')
			.expect(401)

		expect(res.body.status).toEqual(401)
		expect(res.header['content-type']).toMatch(/json/)
		done()
	})
})
