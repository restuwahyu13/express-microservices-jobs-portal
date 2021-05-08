import { expressValidator } from '../utils/util.validator'
import { Request, Response, NextFunction } from 'express'
import { streamBox } from '../utils/util.stream'

export const validator = () => (req: Request, res: Response, next: NextFunction): any => {
	const errors = expressValidator(req)
	if (errors.length > 0) {
		return res.status(400).json({
			method: req.method,
			status: 400,
			errors
		})
	}
	next()
}
