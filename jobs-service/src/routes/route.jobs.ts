import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'
import { authJwt } from '../middlewares/middleware.auth'
// import { loginValidator, emailValidator, registerValidator, tokenValidator, passwordValidator } from '../utils/util.validator'

const router: Router = express.Router()

router.post('/companies/:companiesId/jobs', [serviceLogger('Jobs Create Service'), authJwt()], controller.createJobsController)
router.get('/companies/:companiesId/jobs', [serviceLogger('Jobs Result Service'), authJwt()], controller.resultJobsController)
router.delete('/companies/:companiesId/jobs', [serviceLogger('Jobs Delete Service'), authJwt()], controller.deleteJobsController)
router.put('/companies/:companiesId/jobs', [serviceLogger('Jobs Update Service'), authJwt()], controller.updateJobsController)

export default router
