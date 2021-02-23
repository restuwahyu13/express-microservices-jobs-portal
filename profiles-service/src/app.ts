import express, { Express, Request, Response } from 'express'
import { mongooseConnection } from './utils/util.connection'
// import { bullDashboardMonitor } from './utils/util.dashboard'
import { routeMiddleware } from './middlewares/middleware.route'
import { pluginMiddleware } from './middlewares/middleware.plugin'

const app = express() as Express

// mongooseConnection()
// bullDashboardMonitor()
pluginMiddleware(app)
routeMiddleware(app)

export default app
