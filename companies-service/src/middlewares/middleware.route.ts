import { Express } from 'express'
import companiesRoute from '../routes/route.companies'
import profileRoute from '../routes/route.profile'

export const routeMiddleware = (app: Express): void => {
	app.use('/api/v1', companiesRoute)
	app.use('/api/v1', profileRoute)
}
