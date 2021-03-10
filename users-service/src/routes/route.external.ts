import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'

const router: Router = express.Router()

router.get('/users/rprofile', serviceLogger('Result User Service'), controller.resultUserController)
router.get('/users/dprofile', serviceLogger('Delete User Service'), controller.deleteUserController)
router.get('/users/uprofile', serviceLogger('Update User Service'), controller.updateUserController)

export default router
