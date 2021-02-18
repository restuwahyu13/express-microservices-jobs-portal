import { Express } from 'express'
import registerRoute from '../routes/route.user'

export const routeMiddleware = (app: Express): void => {
	app.use('/api/v1', registerRoute)
}
