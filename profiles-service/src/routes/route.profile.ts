import express, { Router } from 'express'
import { controller } from '../controllers'
import { fileUpload } from '../utils/util.upload'
import { serviceLogger } from '../middlewares/middleware.logger'
import { authJwt } from '../middlewares/middleware.auth'
import { idValidator } from '../utils/util.validator'

const router = express.Router() as Router

<<<<<<< HEAD
router.post('/users/:userId/profile', fileUpload.fields([{ name: 'image' }, { name: 'document' }]), controller.createController)
router.get('/users/:userId/profile/me', controller.resultController)
router.delete('/users/:userId/profile/me', controller.deleteController)
router.delete('/users/:userId/profile/education/:subId', controller.deleteController)
router.delete('/users/:userId/profile/work/:subId', controller.deleteController)
router.delete('/users/:userId/profile/volunteer/:subId', controller.deleteController)
router.delete('/users/:userId/profile/jobs/:subId', controller.deleteController)
router.put('/users/:userId/profile/me', controller.updateController)
router.put('/users/:userId/profile/education/:subId', controller.updateController)
router.put('/users/:userId/profile/work/:subId', controller.updateController)
router.put('/users/:userId/profile/volunteer/:subId', controller.updateController)
router.put('/users/:userId/profile/jobs/:subId', controller.updateController)
=======
router.post(
	'/users/:userId/profile',
	[serviceLogger('Skills Service'), ...idValidator(), fileUpload.fields([{ name: 'image' }, { name: 'document' }])],
	controller.meCreateController
)
router.get('/users/:userId/profile/me', [serviceLogger('Me Service'), authJwt(), ...idValidator()], controller.meResultController)
router.delete(
	'/users/:userId/profile/me',
	[serviceLogger('Me Service'), authJwt(), ...idValidator()],
	controller.meDeleteController
)
router.put(
	'/users/:userId/profile/me',
	[serviceLogger('Me Service'), authJwt(), ...idValidator(), fileUpload.fields([{ name: 'image' }, { name: 'document' }])],
	controller.meUpdateController
)
router.post(
	'/users/:userId/profile/skills',
	[serviceLogger('Skills Service'), authJwt(), ...idValidator()],
	controller.skillsDeleteController
)
router.post(
	'/users/:userId/profile/educations/:educationId',
	[serviceLogger('Educations Service'), authJwt(), ...idValidator()],
	controller.educationsDeleteController
)
router.post(
	'/users/:userId/profile/works/:workId',
	[serviceLogger('Works Service'), authJwt(), ...idValidator()],
	controller.worksDeleteController
)
router.post(
	'/users/:userId/profile/volunteers/:volunterId',
	[serviceLogger('Volunteers Service'), authJwt(), ...idValidator()],
	controller.volunteersDeleteController
)
router.post(
	'/users/:userId/profile/appreciations/:appreciationId',
	[serviceLogger('Appreciations Service'), authJwt(), ...idValidator()],
	controller.appreciationsDeleteController
)
router.post(
	'/users/:userId/profile/jobs/:jobId',
	[serviceLogger('Jobs Service'), authJwt(), ...idValidator()],
	controller.jobsDeleteController
)
// router.put('/users/:userId/profile/me', controller.updateController)
router.put(
	'/users/:userId/profile/skills',
	[serviceLogger('Skills Service'), authJwt(), ...idValidator()],
	controller.skillsUpdateController
)
router.put(
	'/users/:userId/profile/educations/:educationId',
	[serviceLogger('Educations Service'), authJwt(), ...idValidator()],
	controller.educationsUpdateController
)
router.put(
	'/users/:userId/profile/works/:workId',
	[serviceLogger('Works Service'), authJwt(), ...idValidator()],
	controller.worksUpdateController
)
router.put(
	'/users/:userId/profile/volunteers/:volunterId',
	[serviceLogger('Volunteers Service'), authJwt(), ...idValidator()],
	controller.volunteersUpdateController
)
router.put(
	'/users/:userId/profile/appreciations/:appreciationId',
	[serviceLogger('Appreciations Service'), authJwt(), ...idValidator()],
	controller.appreciationsUpdateController
)
router.put(
	'/users/:userId/profile/jobs/:jobId',
	[serviceLogger('Jobs Service'), authJwt(), ...idValidator()],
	controller.jobsUpdateController
)
>>>>>>> 4b604427810e5c18c8673b4a0a0670df8b425e8f

export default router
