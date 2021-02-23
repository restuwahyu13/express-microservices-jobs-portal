import express, { Router } from 'express'
import { controller } from '../controllers'

const router = express.Router() as Router

router.get('/', controller.controllerId)

export default router
