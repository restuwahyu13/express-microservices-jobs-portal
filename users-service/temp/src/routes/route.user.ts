import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'
import { loginSchema, emailSchema, registerSchema, tokenSchema, passwordSchema } from '../utils/util.validator'
import { validator } from '../middlewares/middleware.validation'

const router: Router = express.Router()
/**
 * @method POST
 * @route /users/register
 * @description create new user account
 */
router.post(
	'/users/register',
	[serviceLogger('Register Service'), ...registerSchema(), validator()],
	controller.registerController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.post('/users/login', [serviceLogger('Login Service'), ...loginSchema(), validator()], controller.loginController)
/**
 * @method GET
 * @route /users/activation/:token'
 * @param {token}
 * @description activation user account after register success
 */
router.get('/users/activation/:token', [serviceLogger('Activation Service'), ...tokenSchema()], controller.activationController)
/**
 * @method POST
 * @route /users/resend-token
 * @description forgot password is password cannot access for login
 */
router.post(
	'/users/forgot-password',
	[serviceLogger('Forgot Service'), ...emailSchema(), validator()],
	controller.forgotController
)
/**
 * @method POST
 * @route /users/resend-token
 * @description resend new activation token if activation token expired
 */
router.post('/users/resend-token', [serviceLogger('Resend Service'), ...emailSchema(), validator()], controller.resendController)
/**
 * @method POST
 * @route /users/reset-password/:token
 * @param {token}
 * @description change old pasword to new password
 */
router.post(
	'/users/reset-password/:token',
	[serviceLogger('Reset Service'), ...emailSchema(), ...passwordSchema(), validator()],
	controller.resetController
)

export default router
