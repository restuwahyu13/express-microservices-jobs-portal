import { Request, Response, NextFunction } from 'express'
import consola from 'consola'
import chalk from 'chalk'
import { dateFormat } from '../utils/util.date'

export const serviceLogger = (serviceName: string) => (req: Request, res: Response, next: NextFunction) => {
	if (process.env.NODE_ENV !== 'production') {
		customLogger(req, res, serviceName)
		next()
	}
}

const customLogger = (req: Request, res: Response, serviceName: string) => {
	if (res.statusCode >= 400) {
		consola.info(
			chalk.red(
				'[Logger]:',
				JSON.stringify({
					serviceName: serviceName,
					ipAddress: req.ip || req.headers['x-forwarded-host'] || req.connection.remoteAddress,
					path: req.url,
					method: req.method,
					status: res.statusCode,
					timestamp: dateFormat(new Date()).format('LLLL')
				})
			)
		)
	} else {
		consola.info(
			chalk.green(
				'[Logger]:',
				JSON.stringify({
					serviceName: serviceName,
					ipAddress: req.ip || req.headers['x-forwarded-host'] || req.connection.remoteAddress,
					path: req.url,
					method: req.method,
					status: res.statusCode,
					timestamp: dateFormat(new Date()).format('LLLL')
				})
			)
		)
	}
}
