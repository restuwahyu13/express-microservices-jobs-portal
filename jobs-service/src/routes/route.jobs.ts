import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'
import { authJwt } from '../middlewares/middleware.auth'
// import { loginValidator, emailValidator, registerValidator, tokenValidator, passwordValidator } from '../utils/util.validator'

const router: Router = express.Router()

router.get('/companies/:companiesId/jobs', [serviceLogger('Jobs Create Service'), authJwt()], controller.createJobsController)
router.delete(
	'/companies/:companiesId/jobs/:jobsId',
	[serviceLogger('Jobs Delete Service'), authJwt()],
	controller.deleteJobsController
)
router.put(
	'/companies/:companiesId/jobs/:jobsId',
	[serviceLogger('Jobs Update Service'), authJwt()],
	controller.updateJobsController
)

export default router
