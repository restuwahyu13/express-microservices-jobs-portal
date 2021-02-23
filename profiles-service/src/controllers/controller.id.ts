import { Request, Response } from 'express'
import { setIdPublisher } from '../services/publisher/service.id'
import { getIdSubscriber } from '../services/subscriber/service.id'

export const controllerId = async (req: Request, res: Response) => {
	await setIdPublisher({ email: 'john doe' })
	const data = await getIdSubscriber()
	return res.status(200).json({ data })
}
