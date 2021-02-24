import request, { Response } from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app'

describe('RESEND.ts', () => {
	beforeEach(() => {
		jest.setTimeout(50000)
	})

	afterAll(async (done) => {
		jest.clearAllTimers()
		await mongoose.connection.close()
		done()
	})

	it('get response if resend new token successfully', async (done) => {
		const res: Response = await request(app)
			.post(`/api/v1/user/resend-token`)
			.send({ email: 'jamal96@zetmail.com' })
			.set('Content-Type', 'application/json')
			.expect(200)

		expect(res.body.method).toEqual('POST')
		expect(+res.body.status).toEqual(200)
		expect(res.body.message).toMatch(/jamal96@zetmail.com/)
		done()
	})

	it('get response if resend new token failed', async (done) => {
		const res: Response = await request(app)
			.post(`/api/v1/user/resend-token`)
			.send({ email: 'aldikhan13@grr.la' })
			.set('Content-Type', 'application/json')
			.expect(400)

		expect(res.body.method).toEqual('POST')
		expect(res.body.status).toEqual(400)
		expect(res.body.message).toEqual('user account has been active, please login')
		done()
	})

	it('get response if email is not valid', async (done) => {
		const res: Response = await request(app)
			.post(`/api/v1/user/resend-token`)
			.send({ email: 'restuwahyu13#zetmail.com' })
			.set('Content-Type', 'application/json')
			.expect(400)

		expect(res.body.method).toEqual('POST')
		expect(res.body.status).toEqual(400)
		expect(res.body.errors[0].msg).toEqual('email is not valid')
		done()
	})

	it('get response if email is empty', async (done) => {
		const res: Response = await request(app)
			.post(`/api/v1/user/resend-token`)
			.send({ email: '' })
			.set('Content-Type', 'application/json')
			.expect(400)

		expect(res.body.method).toEqual('POST')
		expect(res.body.status).toEqual(400)
		expect(res.body.errors[0].msg).toEqual('email is required')
		expect(res.body.errors[1].msg).toEqual('email is not valid')
		done()
	})

	it('get response if response header is json', async (done) => {
		const res: Response = await request(app)
			.post(`/api/v1/user/resend-token`)
			.send({ email: 'marley@grr.la' })
			.set('Content-Type', 'application/json')
			.expect(200)

		expect(res.status).toEqual(200)
		expect(res.header['content-type']).toMatch(/json/)
		done()
	})
})
