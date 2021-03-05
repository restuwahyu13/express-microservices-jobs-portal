import express, { Router } from 'express'
import { controller } from '../controllers'
import { fileUpload } from '../utils/util.upload'
import { serviceLogger } from '../middlewares/middleware.logger'
import { authJwt } from '../middlewares/middleware.auth'

const router = express.Router() as Router

router.post(
	'/users/:userId/profile',
	[serviceLogger('Skills Service'), fileUpload.fields([{ name: 'image' }, { name: 'document' }])],
	controller.meCreateController
)
router.get('/users/:userId/profile/me', [serviceLogger('Me Service'), authJwt()], controller.meResultController)
router.delete('/users/:userId/profile/me', [serviceLogger('Me Service'), authJwt()], controller.meDeleteController)
router.put(
	'/users/:userId/profile/me',
	[serviceLogger('Me Service'), authJwt(), fileUpload.fields([{ name: 'image' }, { name: 'document' }])],
	controller.meUpdateController
)
router.post('/users/:userId/profile/skills', [serviceLogger('Skills Service'), authJwt()], controller.skillsDeleteController)
router.post(
	'/users/:userId/profile/educations/:educationId',
	[serviceLogger('Educations Service'), authJwt()],
	controller.educationsDeleteController
)
router.post('/users/:userId/profile/works/:workId', [serviceLogger('Works Service'), authJwt()], controller.worksDeleteController)
router.post(
	'/users/:userId/profile/volunteers/:volunterId',
	[serviceLogger('Volunteers Service'), authJwt()],
	controller.volunteersDeleteController
)
router.post(
	'/users/:userId/profile/appreciations/:appreciationId',
	[serviceLogger('Appreciations Service'), authJwt()],
	controller.appreciationsDeleteController
)
router.post('/users/:userId/profile/jobs/:jobId', [serviceLogger('Jobs Service'), authJwt()], controller.jobsDeleteController)
// router.put('/users/:userId/profile/me', controller.updateController)
router.put('/users/:userId/profile/skills', [serviceLogger('Skills Service'), authJwt()], controller.skillsUpdateController)
router.put(
	'/users/:userId/profile/educations/:educationId',
	[serviceLogger('Educations Service'), authJwt()],
	controller.educationsUpdateController
)
router.put('/users/:userId/profile/works/:workId', [serviceLogger('Works Service'), authJwt()], controller.worksUpdateController)
router.put(
	'/users/:userId/profile/volunteers/:volunterId',
	[serviceLogger('Volunteers Service'), authJwt()],
	controller.volunteersUpdateController
)
router.put(
	'/users/:userId/profile/appreciations/:appreciationId',
	[serviceLogger('Appreciations Service'), authJwt()],
	controller.appreciationsUpdateController
)
router.put('/users/:userId/profile/jobs/:jobId', [serviceLogger('Jobs Service'), authJwt()], controller.jobsUpdateController)

export default router
