import 'dotenv/config'
import { Express } from 'express'
import bodyParser from 'body-parser'
import zlib from 'zlib'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import morgan from 'morgan'
import { router } from 'bull-board'

export const pluginMiddleware = (app: Express): void => {
	app.use(bodyParser.json({ limit: '5mb' }))
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(cors())
	app.use(helmet())
	app.use('/dashboard', router)
	app.use(
		compression({
			level: zlib.constants.Z_BEST_COMPRESSION,
			strategy: zlib.constants.Z_HUFFMAN_ONLY
		})
	)
	app.use(
		rateLimit({
			windowMs: 60 * 1000 * 3,
			max: 1000,
			message: 'too many requests from this IP address, please try after 3 minute'
		})
	)
	app.use(
		slowDown({
			windowMs: 60 * 1000 * 3,
			delayMs: 3000
		})
	)

	if (process.env.NODE_ENV !== 'production') {
		app.use(morgan('dev'))
	}

	app.enable('trust proxy')
	app.disable('x-powered-by')
}
