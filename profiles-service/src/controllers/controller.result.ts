import { Request, Response } from 'express'
import { getStoreCache } from '../utils/util.cache'

export const resultController = async (req: Request, res: Response): Promise<Response<any>> => {
	const userData = await getStoreCache()
	return res.status(200).json({ user: userData })
}
