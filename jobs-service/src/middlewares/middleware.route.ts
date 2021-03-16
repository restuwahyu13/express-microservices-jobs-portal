import { Express } from 'express'
import jobsRoute from '../routes/route.jobs'

export const routeMiddleware = (app: Express): void => {
	app.use('/api/v1', jobsRoute)
}
