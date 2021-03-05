import express, { Router } from 'express'
import { controller } from '../controllers'
import { fileUpload } from '../utils/util.upload'
import { serviceLogger } from '../middlewares/middleware.logger'

const router = express.Router() as Router

router.post(
	'/users/:userId/profile',
	[serviceLogger('Skills Service'), fileUpload.fields([{ name: 'image' }, { name: 'document' }])],
	controller.meCreateController
)
router.get('/users/:userId/profile/me', [serviceLogger('Me Service')], controller.meResultController)
router.delete('/users/:userId/profile/me', [serviceLogger('Me Service')], controller.meDeleteController)
router.put(
	'/users/:userId/profile/me',
	fileUpload.fields([{ name: 'image' }, { name: 'document' }]),
	controller.meUpdateController
)
router.post('/users/:userId/profile/skills', [serviceLogger('Skills Service')], controller.skillsDeleteController)
router.post(
	'/users/:userId/profile/educations/:educationId',
	[serviceLogger('Educations Service')],
	controller.educationsDeleteController
)
router.post('/users/:userId/profile/works/:workId', [serviceLogger('Works Service')], controller.worksDeleteController)
router.post(
	'/users/:userId/profile/volunteers/:volunterId',
	[serviceLogger('Volunteers Service')],
	controller.volunteersDeleteController
)
router.post(
	'/users/:userId/profile/appreciations/:appreciationId',
	[serviceLogger('Appreciations Service')],
	controller.appreciationsDeleteController
)
router.post('/users/:userId/profile/jobs/:jobId', [serviceLogger('Jobs Service')], controller.jobsDeleteController)
// router.put('/users/:userId/profile/me', controller.updateController)
router.put('/users/:userId/profile/skills', [serviceLogger('Skills Service')], controller.skillsUpdateController)
router.put(
	'/users/:userId/profile/educations/:educationId',
	[serviceLogger('Educations Service')],
	controller.educationsUpdateController
)
router.put('/users/:userId/profile/works/:workId', [serviceLogger('Works Service')], controller.worksUpdateController)
router.put(
	'/users/:userId/profile/volunteers/:volunterId',
	[serviceLogger('Volunteers Service')],
	controller.volunteersUpdateController
)
router.put(
	'/users/:userId/profile/appreciations/:appreciationId',
	[serviceLogger('Appreciations Service')],
	controller.appreciationsUpdateController
)
router.put('/users/:userId/profile/jobs/:jobId', [serviceLogger('Jobs Service')], controller.jobsUpdateController)

export default router
