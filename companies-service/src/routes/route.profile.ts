import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'

const router: Router = express.Router()

router.get('/companies/profile', serviceLogger('Result companies Service'), controller.resultCompaniesController)
router.get('/companies/profile', serviceLogger('Delete companies Service'), controller.deleteCompaniesController)
router.get('/companies/profile', serviceLogger('Update companies Service'), controller.updateCompaniesController)

export default router
