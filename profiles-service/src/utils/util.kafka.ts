import { Kafka, logLevel } from 'kafkajs'
import consola from 'consola'
import chalk from 'chalk'

const kafka = new Kafka({
	clientId: process.env.KAFKA_ID,
	brokers: [process.env.KAFKA_BROKERS],
	connectionTimeout: 7500,
	requestTimeout: 15000,
	ssl: false,
	logLevel: logLevel.ERROR
})

export const kafkaProducer = async (evetName: string, data: Record<string, any>): Promise<void> => {
	const producer = await kafka.producer()
	try {
		if (process.env.NODE_ENV !== 'production') {
			producer.on('producer.connect', () => consola.info(chalk.green('producer connected')))
			producer.on('producer.disconnect', () => consola.info(chalk.red('producer disconnected')))
		}

		await producer.send({
			topic: `kafka-${evetName}`,
			messages: [{ value: JSON.stringify(data) }],
			compression: 1
		})
		const tsc = await producer.transaction()
		tsc.commit()
	} catch (err) {
		const tsc = await producer.transaction()
		tsc.abort()
	}
}

export const kafkaConsumer = (evetName: string): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		const consumer = await kafka.consumer()

		if (process.env.NODE_ENV !== 'production') {
			consumer.on('consumer.connect', () => consola.info(chalk.green('consumer connected')))
			consumer.on('consumer.disconnect', () => consola.info(chalk.red('consumer disconnected')))
			consumer.on('consumer.crash', () => consola.info(chalk.red('consumer crashed')))
		}

		await consumer.connect()
		await consumer.subscribe({ topic: `kafka-${evetName}`, fromBeginning: true })
		await consumer.run({
			eachMessage: async ({ topic, partition, message }) => resolve({ topic, partition, message })
		})
	})
}
