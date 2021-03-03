import express, { Router } from 'express'
import { controller } from '../controllers'
import { fileUpload } from '../utils/util.upload'

const router = express.Router() as Router

router.post('/users/:userId/profile', fileUpload.fields([{ name: 'image' }, { name: 'document' }]), controller.meCreateController)
router.get('/users/:userId/profile/me', controller.meResultController)
router.delete('/users/:userId/profile/me', controller.meDeleteController)
router.post('/users/:userId/profile/skills', controller.skillsDeleteController)
router.post('/users/:userId/profile/educations/:educationId', controller.educationsDeleteController)
router.post('/users/:userId/profile/works/:workId', controller.worksDeleteController)
router.post('/users/:userId/profile/volunteers/:volunterId', controller.volunteersDeleteController)
router.post('/users/:userId/profile/appreciations/:appreciationId', controller.appreciationsDeleteController)
router.post('/users/:userId/profile/jobs/:jobId', controller.jobsDeleteController)
// router.put('/users/:userId/profile/me', controller.updateController)
router.put('/users/:userId/profile/skills', controller.skillsUpdateController)
router.put('/users/:userId/profile/educations/:educationId', controller.educationsUpdateController)
router.put('/users/:userId/profile/works/:workId', controller.worksUpdateController)
router.put('/users/:userId/profile/volunteers/:volunterId', controller.volunteersUpdateController)
router.put('/users/:userId/profile/appreciations/:appreciationId', controller.appreciationsUpdateController)
router.put('/users/:userId/profile/jobs/:jobId', controller.jobsUpdateController)

export default router
