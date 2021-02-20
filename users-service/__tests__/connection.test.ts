import { mongooseConnection } from '../src/utils/util.connection'
import mongoose from 'mongoose'

describe('UTIL.CONNECTION.TS', () => {
	beforeEach(() => {
		mongooseConnection()
	})

	it('connection status is connected', () => {
		expect(mongoose.STATES.connected === 1).toBeTruthy()
	})

	it('connection status is disconnected', () => {
		mongoose.disconnect()
		expect(mongoose.STATES.disconnected === 0).toBeTruthy()
	})
})
