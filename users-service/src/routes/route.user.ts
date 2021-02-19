import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'

const router: Router = express.Router()

router.post('/user/register', serviceLogger('Register Service'), controller.registerController)
router.post('/user/login', serviceLogger('Login Service'), controller.loginController)
router.get('/user/activation/:id', serviceLogger('Activation Service'), controller.activationController)
router.post('/user/resend', serviceLogger('Resend Service'), controller.resendController)

export default router
