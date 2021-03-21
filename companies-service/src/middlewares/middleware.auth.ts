import { Request, Response, NextFunction } from 'express'
import { verifySignAccessToken } from '../utils/util.jwt'
import { streamBox } from '../utils/util.stream'

export const authJwt = () => (req: Request | any, res: Response, next: NextFunction): void => {
	const tokenHeader: string = req.headers.authorization

	if (tokenHeader) {
		const decodedToken: string | any = verifySignAccessToken()(tokenHeader.split('Bearer ')[1])

		if (decodedToken) {
			req.user = decodedToken
			next()
		} else {
			streamBox(res, 401, {
				method: req.method,
				statusCode: 401,
				message: 'unautorization, access token expired or not valid'
			})
		}
	} else {
		streamBox(res, 401, {
			method: req.method,
			statusCode: 401,
			message: 'unautorization, access token is required'
		})
	}
}
