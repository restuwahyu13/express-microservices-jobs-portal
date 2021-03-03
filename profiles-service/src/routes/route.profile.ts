import express, { Router } from 'express'
import { controller } from '../controllers'
import { fileUpload } from '../utils/util.upload'

const router = express.Router() as Router

router.post('/users/:userId/profile', fileUpload.fields([{ name: 'image' }, { name: 'document' }]), controller.createController)
// router.get('/users/:userId/profile/me', controller.resultController)
// router.delete('/users/:userId/profile/me', controller.deleteController)
router.post('/users/:userId/profile/skills', controller.skillsDeleteController)
// router.delete('/users/:userId/profile/education/:subId', controller.deleteController)
// router.delete('/users/:userId/profile/work/:subId', controller.deleteController)
router.post('/users/:userId/profile/volunteers/:volunterId', controller.volunteersDeleteController)
// router.delete('/users/:userId/profile/appreciation/:subId', controller.deleteController)
router.delete('/users/:userId/profile/jobs/:subId', controller.jobsDeleteController)
// router.put('/users/:userId/profile/me', controller.updateController)
router.put('/users/:userId/profile/skills', controller.skillsUpdateController)
// router.put('/users/:userId/profile/education/:subId', controller.updateController)
// router.put('/users/:userId/profile/work/:subId', controller.updateController)
router.put('/users/:userId/profile/volunteers/:volunterId', controller.volunteersUpdateController)
// router.put('/users/:userId/profile/appreciation/:subId', controller.updateController)
router.put('/users/:userId/profile/jobs/:subId', controller.jobsUpdateController)

export default router
