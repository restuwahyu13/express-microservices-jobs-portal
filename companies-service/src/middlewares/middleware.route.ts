import { Express } from 'express'
import companiesRoute from '../routes/route.companies'
import profileRoute from '../routes/route.profile'
import jobsRoute from '../routes/route.jobs'

export const routeMiddleware = (app: Express): void => {
	app.use('/api/v1', companiesRoute)
	app.use('/api/v1', profileRoute)
	app.use('/api/v1', jobsRoute)
}
