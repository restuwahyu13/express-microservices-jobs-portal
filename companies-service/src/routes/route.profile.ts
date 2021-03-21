import express, { Router, Request, Response } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'
import { idValidator } from '../utils/util.validator'
import { authJwt } from '../middlewares/middleware.auth'
import { fileUpload } from '../utils/util.upload'

const router: Router = express.Router()

router.get(
	'/companies/profile/:companiesId',
	[serviceLogger('Result Companies Service'), authJwt(), ...idValidator()],
	controller.resultCompaniesController
)
router.delete(
	'/companies/profile/:companiesId',
	[serviceLogger('Delete Companies Service'), authJwt(), ...idValidator()],
	controller.deleteCompaniesController
)
router.put(
	'/companies/profile/:companiesId',
	[
		serviceLogger('Update Companies Service'),
		authJwt(),
		...idValidator(),
		fileUpload.fields([{ name: 'photo' }, { name: 'banner' }, { name: 'gallery' }])
	],
	controller.updateCompaniesController
)

export default router
