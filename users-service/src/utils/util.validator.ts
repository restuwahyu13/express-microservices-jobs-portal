import { Request } from 'express'
import { check, validationResult, ValidationError, ValidationChain, Result } from 'express-validator'

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

export const registerValidator = (): ValidationChain[] => [
	check('email').isEmpty().withMessage('email is required'),
	check('email').isEmail().withMessage('email is not valid'),
	check('password').isEmpty().withMessage('password is required'),
	check('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters')
]

export const loginValidator = (): ValidationChain[] => [
	check('email').notEmpty().withMessage('email is required'),
	check('email').isEmail().withMessage('email is not valid'),
	check('password').notEmpty().withMessage('pasword is required')
]

export const emailValidator = (): ValidationChain[] => [
	check('email').notEmpty().withMessage('email is required'),
	check('email').isEmail().withMessage('email is not valid')
]

export const tokenValidator = (): ValidationChain[] => [
	check('token').notEmpty().withMessage('token is required'),
	check('token').isBase64().withMessage('token is not valid')
]
