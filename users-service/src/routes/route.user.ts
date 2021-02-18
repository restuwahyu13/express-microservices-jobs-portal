import express, { Router } from 'express'
import { controller } from '../controllers'

const router: Router = express.Router()

router.post('/user/register', controller.registerController)

export default router
