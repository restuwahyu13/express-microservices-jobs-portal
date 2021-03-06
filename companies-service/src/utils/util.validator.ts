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

export const registerValidator = (): ValidationChain[] => [
	check('companyName').notEmpty().withMessage('companyName is required'),
	check('companyName')
		.not()
		.custom((val: string) => /[^a-zA-Z]/gi.test(val))
		.withMessage('companyName cannot include unique character'),
	check('email').notEmpty().withMessage('email is required'),
	check('email').isEmail().withMessage('email is not valid'),
	check('password').notEmpty().withMessage('password is required'),
	check('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters'),
	check('phone').notEmpty().withMessage('phone is required'),
	check('phone').isLength({ min: 10 }).withMessage('phone number must be at least 10 characters'),
	check('phone').isLength({ max: 12 }).withMessage('phone number must be at least 12 characters'),
	check('phone').isMobilePhone('id-ID').withMessage('phone number is not valid')
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

export const idValidator = (): ValidationChain[] => [
	check('companiesId').notEmpty().withMessage('companiesId is required'),
	check('companiesId').isUUID().withMessage('companiesId format is not valid')
]

export const passwordValidator = (): ValidationChain[] => [
	check('password').notEmpty().withMessage('password is required'),
	check('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters'),
	check('password')
		.not()
		.custom((value: string, { req }: Meta) => req.body.cpassword !== value)
		.withMessage('confirm password is not match with password'),
	check('cpassword').notEmpty().withMessage('cpassword is required'),
	check('cpassword').isLength({ min: 8 }).withMessage('cpassword must be at least 8 characters')
]
