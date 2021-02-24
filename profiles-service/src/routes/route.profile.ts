import express, { Router } from 'express'
import { controller } from '../controllers'
import { getStoreCacheId } from '../utils/util.id'

const router = express.Router() as Router

router.get('/', async (req, res) => {
	const id = await getStoreCacheId()
	return res.status(200).json({ id: id, message: 'id user from redis' })
})

export default router
