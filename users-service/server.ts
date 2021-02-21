import http, { Server } from 'http'
import cluster from 'cluster'
import { cpus, CpuInfo } from 'os'
import consola from 'consola'
import chalk from 'chalk'
import app from './src/app'

const server = http.createServer(app) as Server
const host: any = process.env.HOST
const port: any = process.env.PORT
const coreThread: CpuInfo[] = cpus()

if (cluster.isMaster) {
	for (let i = 0; i < coreThread.length; i++) {
		cluster.fork()
	}

	const workersTread: any = []
	for (const id in cluster.workers) {
		workersTread.push(id)
	}

	workersTread.forEach(
		async (pid: number, _: any): Promise<void> => {
			await cluster.workers[pid].send({
				from: 'isMaster',
				type: 'SIGKILL',
				message: 'cleanup is worker dead and change to new worker'
			})
		}
	)

	if (process.env.NODE_ENV !== 'production') {
		cluster.on('online', (worker: any): void => {
			if (worker.isConnected()) {
				console.info(`${chalk.greenBright('worker active pid')}: ${worker.process.pid}`)
			}
		})

		cluster.on('exit', (worker: any, code: any, signal: any): void => {
			if (worker.isDead()) {
				console.info(`${chalk.redBright('worker dead pid')}: ${worker.process.pid}`)
			}
			cluster.fork()
		})
	}
} else {
	server.listen(port, host, (): void => consola.success(`server is running on ${port}`))
}
