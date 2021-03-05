import { Request } from 'express'
import { check, validationResult, ValidationError, ValidationChain, Result, Meta } from 'express-validator'

export const expressValidator = (req: Request): ValidationError[] => {
	const errors: Result<ValidationError> = validationResult(req)

	const messages: ValidationError[] = []
	if (!errors.isEmpty()) {
		for (const i of errors.array()) {
			messages.push(i)
		}
	}
	return messages
}

export const idValidator = (): ValidationChain[] => [
	check('userId').notEmpty().withMessage('userId is required'),
	check('userId').isUUID().withMessage('userId format is not valid')
]
