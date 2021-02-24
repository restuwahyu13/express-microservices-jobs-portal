import express, { Router } from 'express'
import { controller } from '../controllers'

const router = express.Router() as Router

router.post('/profile', controller.createController)
router.get('/profile/:id', controller.resultController)
router.delete('/profile/:id', controller.deleteController)
router.put('/profile/:id', controller.updateController)

export default router
