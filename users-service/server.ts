import http, { Server } from 'http'
import cluster, { Worker } from 'cluster'
import { cpus, CpuInfo } from 'os'
import consola from 'consola'
import chalk from 'chalk'
import app from './src/app'

const coreThread: CpuInfo[] = cpus()

if (cluster.isMaster) {
	for (let i = 0; i < coreThread.length; i++) {
		cluster.fork()
	}

	if (process.env.NODE_ENV !== 'production') {
		cluster.on('online', (worker: Worker): void => {
			if (worker.isConnected()) {
				console.info(`${chalk.greenBright('worker active pid')}: ${worker.process.pid}`)
			}
		})

		cluster.on('exit', (worker: Worker, code: number, signal: string): void => {
			if (worker.isDead()) {
				console.info(`${chalk.redBright('worker dead pid')}: ${worker.process.pid}`)
			}
			cluster.fork()
		})
	}
} else {
	const server = http.createServer(app) as Server
	const host: any = process.env.HOST
	const port: any = process.env.PORT
	server.listen(port, host, (): void => {
		if (process.env.NODE_ENV !== 'production') consola.success(`server is running on ${port}`)
	})
}
