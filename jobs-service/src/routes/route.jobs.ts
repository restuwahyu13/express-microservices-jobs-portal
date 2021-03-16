import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'
// import { loginValidator, emailValidator, registerValidator, tokenValidator, passwordValidator } from '../utils/util.validator'

const router: Router = express.Router()

router.post('/companies/:companyId/jobs', [serviceLogger('Jobs Create Service')], controller.createJobsController)
router.get('/companies/:companyId/jobs', [serviceLogger('Login Service')], controller.resultJobsController)
router.delete('/companies/:companyId/jobs', [serviceLogger('Forgot Service')], controller.deleteJobsController)
router.put('/companies/:companyId/jobs', [serviceLogger('Resend Service')], controller.updateJobsController)

export default router
