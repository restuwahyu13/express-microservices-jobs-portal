import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'
import { loginValidator, emailValidator, registerValidator, tokenValidator, passwordValidator } from '../utils/util.validator'

const router: Router = express.Router()

router.post('/companies/register', [serviceLogger('Register Service'), ...registerValidator()], controller.registerController)
router.post('/companies/login', [serviceLogger('Login Service'), ...loginValidator()], controller.loginController)
router.get(
	'/companies/activation/:token',
	[serviceLogger('Activation Service'), ...tokenValidator()],
	controller.activationController
)
router.post('/companies/forgot-password', [serviceLogger('Forgot Service'), ...emailValidator()], controller.forgotController)
router.post('/companies/resend-token', [serviceLogger('Resend Service'), ...emailValidator()], controller.resendController)
router.post(
	'/companies/reset-password/:token',
	[serviceLogger('Reset Service'), ...tokenValidator(), ...passwordValidator()],
	controller.resetController
)

export default router
