import mongoose from 'mongoose'
import consola from 'consola'
import q from 'q'

export const mongooseConnection = (): void => {
	mongoose.Promise = q.Promise

	mongoose.connect(process.env.MONGO_URI, {
		poolSize: 10,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		socketTimeoutMS: 60000,
		serverSelectionTimeoutMS: 60000,
		loggerLevel: 'error'
	})

	mongoose.connection.on('connecting', () => consola.info('database connecting'))
	mongoose.connection.on('connected', () => consola.success('database connected'))
	mongoose.connection.on('disconnecting', () => consola.info('database disconnecting'))
	mongoose.connection.on('disconnected', () => consola.info('database disconnected'))
	mongoose.connection.on('error', () => consola.error('database error'))
}
