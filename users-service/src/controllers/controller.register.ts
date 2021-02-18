import { Request, Response } from 'express'
import { setRegisterPublisher } from '../services/publisher/service.register'
import { getRegisterSubscriber } from '../services/subscriber/service.register'
import { streamBox } from '../utils/util.stream'
import { IUser } from '../interface/interface.user'

export const registerController = async (req: Request, res: Response): Promise<any> => {
	const { firstName, lastName, email, password, location, phone }: IUser = req.body

	await setRegisterPublisher({ firstName, lastName, email, password, location, phone })

	const data = await getRegisterSubscriber()

	console.log(data)

	// streamBox(res, data.statusCode, {

	// })

	// return res.status(data.statusCode).json({message: data.message})
}
