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

export const registerSchema = (): ValidationChain[] => [
	check('firstName').notEmpty().withMessage('firstName is required'),
	check('firstName')
		.not()
		.custom((val: string) => /[^a-zA-Z]/gi.test(val))
		.withMessage('firstName cannot include unique character'),
	check('lastName').notEmpty().withMessage('lastName is required'),
	check('lastName')
		.not()
		.custom((val: string) => /[^a-zA-Z]/gi.test(val))
		.withMessage('lastName cannot include unique character'),
	check('email').notEmpty().withMessage('email is required'),
	check('email').isEmail().withMessage('email is not valid'),
	check('password').notEmpty().withMessage('password is required'),
	check('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters'),
	check('location').notEmpty().withMessage('location is required'),
	check('location')
		.not()
		.custom((val: string) => /[^a-zA-Z]/gi.test(val))
		.withMessage('location cannot include unique character'),
	check('phone').notEmpty().withMessage('phone is required'),
	check('phone').isLength({ min: 10 }).withMessage('phone number must be at least 10 characters'),
	check('phone').isLength({ max: 12 }).withMessage('phone number must be at least 12 characters'),
	check('phone').isMobilePhone('id-ID').withMessage('phone number is not valid')
]

export const loginSchema = (): ValidationChain[] => [
	check('email').notEmpty().withMessage('email is required'),
	check('email').isEmail().withMessage('email is not valid'),
	check('password').notEmpty().withMessage('pasword is required')
]

export const emailSchema = (): ValidationChain[] => [
	check('email').notEmpty().withMessage('email is required'),
	check('email').isEmail().withMessage('email is not valid')
]

export const tokenSchema = (): ValidationChain[] => [
	check('token').notEmpty().withMessage('token is required'),
	check('token').isBase64().withMessage('token is must be a base64 format')
]

export const idSchema = (): ValidationChain[] => [
	check('id').notEmpty().withMessage('id is required'),
	check('id').isMongoId().withMessage('id must be a mongoId format')
]

export const passwordSchema = (): ValidationChain[] => [
	check('password').notEmpty().withMessage('password is required'),
	check('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters'),
	check('password')
		.not()
		.custom((value: string, { req }: Meta) => req.body.cpassword !== value)
		.withMessage('confirm password is not match with password'),
	check('cpassword').notEmpty().withMessage('cpassword is required'),
	check('cpassword').isLength({ min: 8 }).withMessage('cpassword must be at least 8 characters')
]
