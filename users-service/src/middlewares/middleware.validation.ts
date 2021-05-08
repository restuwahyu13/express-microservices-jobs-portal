import { expressValidator } from '../utils/util.validator'
import { Request, Response, NextFunction } from 'express'
import { streamBox } from '../utils/util.stream'

export const validator = () => (req: Request, res: Response, next: NextFunction) => {
	const errors = expressValidator(req)
	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	}
	next()
}
