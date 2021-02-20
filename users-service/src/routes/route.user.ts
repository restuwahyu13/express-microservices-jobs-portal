import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'
import { loginValidator, emailValidator, registerValidator, tokenValidator, passwordValidator } from '../utils/util.validator'

const router: Router = express.Router()

router.post('/user/register', [serviceLogger('Register Service'), ...registerValidator()], controller.registerController)
router.post('/user/login', [serviceLogger('Login Service'), ...loginValidator()], controller.loginController)
router.get('/user/activation/:token', [serviceLogger('Activation Service'), ...tokenValidator()], controller.activationController)
router.post('/user/forgot-password', [serviceLogger('Forgot Service'), ...emailValidator()], controller.forgotController)
router.post('/user/resend-token', [serviceLogger('Resend Service'), ...emailValidator()], controller.resendController)
router.post(
	'/user/reset-password/:token',
	[serviceLogger('Reset Service'), ...tokenValidator(), ...passwordValidator()],
	controller.resetController
)

export default router
