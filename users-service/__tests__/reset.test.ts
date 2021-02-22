import request, { Response } from 'supertest'
import mongoose from 'mongoose'
import { QueueEvents, Worker } from 'bullmq'
import app from '../src/app'

describe('RESET.ts', () => {
	let accessToken

	beforeEach(() => {
		jest.setTimeout(50000)
		accessToken =
			'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SWpZd016RXhaRFkwWXpWaVpqbGpNMkZoTjJVMVlqYzFNaUlzSW1WdFlXbHNJam9pWVd4a2FXdG9ZVzR4TTBCbmNuSXViR0VpTENKcFlYUWlPakUyTVRNNU56ZzBPVEFzSW1WNGNDSTZNVFkwTlRVek5qQTVNSDAub2FIV2ZzZzliV3VFZVFsYXh4WjRmOVFtTWNUclU4WURYdGl5aGxtemFWaw=='
	})

	afterAll(async (done) => {
		jest.clearAllTimers()
		await mongoose.connection.close()
		await new Worker('reset').close()
		await new QueueEvents('reset').close()
		done()
	})

	it('get response if change new password successfully', async (done) => {
		const res: Response = await request(app)
			.post(`/api/v1/user/reset-password/${accessToken}`)
			.send({ password: 'qwerty123', cpassword: 'qwerty123' })
			.set('Content-Type', 'application/json')
			.expect(200)

		expect(res.body.method).toEqual('POST')
		expect(res.body.status).toEqual(200)
		expect(res.body.message).toEqual('change new password successfully, please login')
		done()
	})

	it('get response if cpassword and password is empty', async (done) => {
		const res: Response = await request(app)
			.post(`/api/v1/user/reset-password/${accessToken}`)
			.send({ password: '', cpassword: '' })
			.set('Content-Type', 'application/json')
			.expect(400)

		expect(res.body.method).toEqual('POST')
		expect(res.body.status).toEqual(400)
		expect(res.body.errors[0].msg).toEqual('password is required')
		expect(res.body.errors[1].msg).toEqual('password must be at least 8 characters')
		expect(res.body.errors[2].msg).toEqual('cpassword is required')
		expect(res.body.errors[3].msg).toEqual('cpassword must be at least 8 characters')
		done()
	})

	it('get response if cpassword is not match with password', async (done) => {
		const res: Response = await request(app)
			.post(`/api/v1/user/reset-password/${accessToken}`)
			.send({ password: 'qwerty123', cpassword: 'qwerty1234' })
			.set('Content-Type', 'application/json')
			.expect(400)

		expect(res.body.method).toEqual('POST')
		expect(res.body.status).toEqual(400)
		expect(res.body.errors[0].msg).toEqual('confirm password is not match with password')
		done()
	})

	it('get response if response header is json', async (done) => {
		const res: Response = await request(app)
			.post(`/api/v1/user/reset-password/${accessToken}`)
			.send({ password: 'qwerty123', cpassword: 'qwerty123' })
			.set('Content-Type', 'application/json')
			.expect(200)

		expect(res.status).toEqual(200)
		expect(res.header['content-type']).toMatch(/json/)
		done()
	})
})
