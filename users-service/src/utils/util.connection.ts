import mongoose from 'mongoose'
import consola from 'consola'
;((): void => {
	mongoose.Promise = global.Promise

	const connection = mongoose.createConnection(process.env.MONGO_URI, {
		dbName: 'microservice',
		minPoolSize: 1,
		maxPoolSize: 20,
		reconnectInterval: 3000,
		compression: { compressors: ['zlib'] },
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		socketTimeoutMS: 60000,
		serverSelectionTimeoutMS: 60000,
		loggerLevel: 'error'
	})

	connection.on('connecting', () => consola.info('database connecting'))
	connection.on('connected', () => consola.success('database connected'))
	connection.on('disconnecting', () => consola.info('database disconnecting'))
	connection.on('disconnected', () => {
		consola.info('database disconnected')
		connection.close()
	})
	connection.on('error', () => {
		consola.error('database error')
		connection.close()
	})
})()
