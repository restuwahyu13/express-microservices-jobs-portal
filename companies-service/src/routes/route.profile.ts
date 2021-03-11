import express, { Router } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'
import { idValidator } from '../utils/util.validator'
import { fileUpload } from '../utils/util.upload'

const router: Router = express.Router()

router.get('/companies/profile/:companiesId', serviceLogger('Result companies Service'), controller.resultCompaniesController)
router.delete('/companies/profile:companiesId', serviceLogger('Delete companies Service'), controller.deleteCompaniesController)
router.put(
	'/companies/profile:companiesId',
	[...idValidator(), fileUpload.fields([{ name: 'photo' }, { name: 'banner' }, { name: 'gallery' }])],
	serviceLogger('Update companies Service'),
	controller.updateCompaniesController
)

export default router
