import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'

const router: Router = express.Router()

router.post('/user/register', serviceLogger('Register Service'), controller.registerController)
router.post('/user/login', serviceLogger('Login Service'), controller.loginController)
router.get('/user/activation/:id', serviceLogger('Activation Service'), controller.activationController)
router.post('/user/forgot-password', serviceLogger('Resend Service'), controller.forgotController)
router.post('/user/resend-token', serviceLogger('Resend Service'), controller.resendController)
router.post('/user/reset-password/:id', serviceLogger('Resend Service'), controller.resetController)

export default router
