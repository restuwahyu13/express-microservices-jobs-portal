import { Express } from 'express'
import userRoute from '../routes/route.user'

export const routeMiddleware = (app: Express): void => {
	app.use('/api/v1', userRoute)
}
