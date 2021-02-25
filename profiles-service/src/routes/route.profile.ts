import express, { Router } from 'express'
import { controller } from '../controllers'
import { fileUpload } from '../utils/util.upload'

const router = express.Router() as Router

// router.get('/user/:id/me', controller.createController)
router.post('/users/:id/profile', fileUpload.single('photo'), controller.createController)
// router.post('/user/:id/education', controller.createController)
// router.post('/user/:id/work-experince', controller.createController)
// router.post('/user/:id/skills', controller.createController)
// router.post('/user/:id/volunteer-experience', controller.createController)
// router.post('/user/:id/portofolio', controller.createController)
// router.post('/user/:id/jobs-prefences', controller.createController)

export default router
