import express, { Router, Request, Response } from 'express'
import { controller } from '../controllers'
import { serviceLogger } from '../middlewares/middleware.logger'
import { idValidator } from '../utils/util.validator'
import { fileUpload } from '../utils/util.upload'

const router: Router = express.Router()

router.post('/testing', fileUpload.fields([{ name: 'photo' }]), (req: Request, res: Response) => {
	const photos = []
	const files = req.files['photo']
	for (let i in files) {
		photos.push(files[i].originalname)
	}
	console.log(photos)
	res.end()
})

router.get('/companies/profile/:companiesId', serviceLogger('Result companies Service'), controller.resultCompaniesController)
router.delete('/companies/profile/:companiesId', serviceLogger('Delete companies Service'), controller.deleteCompaniesController)
router.put(
	'/companies/profile/:companiesId',
	[serviceLogger('Update companies Service'), fileUpload.fields([{ name: 'photo' }, { name: 'banner' }, { name: 'gallery' }])],
	controller.updateCompaniesController
)

export default router
