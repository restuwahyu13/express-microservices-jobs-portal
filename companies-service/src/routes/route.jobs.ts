import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'
import { idValidator } from '../utils/util.validator'
import { authJwt } from '../middlewares/middleware.auth'

const router: Router = express.Router()

router.get(
	'/companies/jobs/:companiesId',
	[serviceLogger('Result Companies Jobs Post Service')],
	controller.resultJobsPostController
)

export default router
