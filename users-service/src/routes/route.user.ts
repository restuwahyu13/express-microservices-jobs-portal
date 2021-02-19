import express, { Router } from 'express'
import { controller } from '../controllers'

const router: Router = express.Router()

router.post('/user/register', controller.registerController)
router.post('/user/login', controller.loginController)
router.get('/user/activation/:id', controller.activationController)
router.post('/user/resend', controller.resendController)

export default router
