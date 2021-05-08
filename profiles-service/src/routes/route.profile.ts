import express, { Router } from 'express'
import { controller } from '../controllers'
import { fileUpload } from '../utils/util.upload'
import { serviceLogger } from '../middlewares/middleware.logger'
import { authJwt } from '../middlewares/middleware.auth'
import {
	userIdSchema,
	educationIdSchema,
	workIdSchema,
	volunterIdSchema,
	appreciationIdSchema,
	jobsIdSchema,
	meCreateSchema
} from '../utils/util.validator'
import { validator } from '../middlewares/middleware.validation'

const router = express.Router() as Router
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.post(
	'/users/:userId/profile',
	[serviceLogger('Me Service'), ...meCreateSchema(), validator(), fileUpload.fields([{ name: 'image' }, { name: 'document' }])],
	controller.meCreateController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.get(
	'/users/:userId/profile/me',
	[serviceLogger('Me Service'), authJwt(), ...userIdSchema(), validator()],
	controller.meResultController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.delete(
	'/users/:userId/profile/me',
	[serviceLogger('Me Service'), authJwt(), ...userIdSchema(), validator()],
	controller.meDeleteController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.put(
	'/users/:userId/profile/me',
	[
		serviceLogger('Me Service'),
		authJwt(),
		...userIdSchema(),
		validator(),
		fileUpload.fields([{ name: 'image' }, { name: 'document' }])
	],
	controller.meUpdateController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.post(
	'/users/:userId/profile/skills',
	[serviceLogger('Skills Service'), authJwt(), ...userIdSchema(), validator()],
	controller.skillsDeleteController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.post(
	'/users/:userId/profile/educations/:educationId',
	[serviceLogger('Educations Service'), authJwt(), ...userIdSchema(), ...educationIdSchema(), validator()],
	controller.educationsDeleteController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.post(
	'/users/:userId/profile/works/:workId',
	[serviceLogger('Works Service'), authJwt(), ...userIdSchema(), ...workIdSchema(), validator()],
	controller.worksDeleteController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.post(
	'/users/:userId/profile/volunteers/:volunterId',
	[serviceLogger('Volunteers Service'), authJwt(), ...userIdSchema(), ...volunterIdSchema(), validator()],
	controller.volunteersDeleteController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.post(
	'/users/:userId/profile/appreciations/:appreciationId',
	[serviceLogger('Appreciations Service'), authJwt(), ...userIdSchema(), ...appreciationIdSchema(), validator()],
	controller.appreciationsDeleteController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.post(
	'/users/:userId/profile/jobs/:jobId',
	[serviceLogger('Jobs Service'), authJwt(), ...userIdSchema(), ...jobsIdSchema(), validator()],
	controller.jobsDeleteController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.put(
	'/users/:userId/profile/skills',
	[serviceLogger('Skills Service'), authJwt(), ...userIdSchema(), validator()],
	controller.skillsUpdateController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.put(
	'/users/:userId/profile/educations/:educationId',
	[serviceLogger('Educations Service'), authJwt(), ...userIdSchema(), ...educationIdSchema(), validator()],
	controller.educationsUpdateController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.put(
	'/users/:userId/profile/works/:workId',
	[serviceLogger('Works Service'), authJwt(), ...userIdSchema(), ...workIdSchema(), validator()],
	controller.worksUpdateController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.put(
	'/users/:userId/profile/volunteers/:volunterId',
	[serviceLogger('Volunteers Service'), authJwt(), ...userIdSchema(), ...volunterIdSchema(), validator()],
	controller.volunteersUpdateController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.put(
	'/users/:userId/profile/appreciations/:appreciationId',
	[serviceLogger('Appreciations Service'), authJwt(), ...userIdSchema(), ...appreciationIdSchema(), validator()],
	controller.appreciationsUpdateController
)
/**
 * @method POST
 * @route /users/login
 * @description user login into dashboard
 */
router.put(
	'/users/:userId/profile/jobs/:jobId',
	[serviceLogger('Jobs Service'), authJwt(), ...userIdSchema(), ...jobsIdSchema(), validator()],
	controller.jobsUpdateController
)

export default router
