import { Express } from 'express'
import profileRoute from '../routes/route.profile'

export const routeMiddleware = (app: Express): void => {
	app.use(profileRoute)
}
