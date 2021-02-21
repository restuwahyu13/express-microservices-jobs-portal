import request, { Response } from 'supertest'
import { Base64 } from 'js-base64'
import mongoose from 'mongoose'
import { QueueEvents, Worker } from 'bullmq'
import app from '../src/app'

describe('LOGIN.ts', () => {
	beforeEach(() => {
		jest.setTimeout(50000)
	})

	afterAll(async (done) => {
		jest.clearAllTimers()
		await mongoose.connection.close()
		await new Worker('login').close()
		await new QueueEvents('login').close()
		done()
	})

	it('get response if login successfully', async (done) => {
		const res: Response = await request(app)
			.post('/api/v1/user/login')
			.send({ email: 'aldikhan13@grr.la', password: 'aldikhan13' })
			.set('Content-Type', 'application/json')

		expect(res.body.method).toBe('POST')
		expect(res.body.status).toEqual(200)
		expect(res.body.message).toEqual('login successfully')
		done()
	})

	it('get response if account is not exist', async (done) => {
		const res: Response = await request(app)
			.post('/api/v1/user/login')
			.send({ email: 'aldikhan131@grr.la', password: 'aldikhan13' })
			.set('Content-Type', 'application/json')

		expect(res.body.method).toBe('POST')
		expect(res.body.status).toEqual(404)
		expect(res.body.message).toEqual('user account is not exist, please register new account')
		done()
	})

	it('get response if password is wrong', async (done) => {
		const res: Response = await request(app)
			.post('/api/v1/user/login')
			.send({ email: 'aldikhan13@grr.la', password: 'aldikhan131' })
			.set('Content-Type', 'application/json')

		expect(res.body.method).toBe('POST')
		expect(res.body.status).toEqual(400)
		expect(res.body.message).toEqual('email/password is wrong')
		done()
	})

	it('get response if response header is json', async (done) => {
		const res: Response = await request(app)
			.post('/api/v1/user/login')
			.send({ email: 'aldikhan13@grr.la', password: 'aldikhan13' })
			.set('Content-Type', 'application/json')

		expect(res.status).toEqual(200)
		expect(res.header['content-type']).toMatch(/json/)
		done()
	})

	it('get response if accessToken and refreshToken is valid', async (done) => {
		const res: Response = await request(app)
			.post('/api/v1/user/login')
			.send({ email: 'aldikhan13@grr.la', password: 'aldikhan13' })
			.set('Content-Type', 'application/json')

		expect(Base64.isValid(res.body.accessToken)).toBeTruthy()
		expect(Base64.isValid(res.body.refreshToken)).toBeTruthy()
		done()
	})
})
