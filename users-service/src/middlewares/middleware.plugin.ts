import 'dotenv/config'
import { Express } from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import zlib from 'zlib'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import httpAuth from 'http-auth'
import httpBasic from 'http-auth-connect'
import { router } from 'bull-board'

const basic = httpAuth.basic({
	realm: 'Users Service',
	file: path.resolve(__dirname, '../../user.htpasswd')
})

export const pluginMiddleware = (app: Express): void => {
	app.use(bodyParser.json({ limit: '5mb' }))
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(cors())
	app.use(helmet())
	app.use('/bullmq/dashboard', [httpBasic(basic), router])
	app.use(
		compression({
			level: zlib.constants.Z_BEST_COMPRESSION,
			strategy: zlib.constants.Z_HUFFMAN_ONLY
		})
	)
	app.use(
		rateLimit({
			windowMs: 3 * 60 * 1000,
			max: 1000,
			message: 'too many requests from this IP address, please try after 3 minute'
		})
	)
	app.use(
		slowDown({
			windowMs: 3 * 60 * 1000,
			delayAfter: 1000,
			delayMs: 3000
		})
	)

	app.enable('trust proxy')
	app.disable('x-powered-by')
}
