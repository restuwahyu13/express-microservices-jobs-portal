import { Request, Response } from 'express'
import { setLoginPublisher } from '../services/publisher/service.login'
import { getLoginSubscriber } from '../services/subscriber/service.login'
import { streamBox } from '../utils/util.stream'
import { verifyPassword } from '../utils/util.encrypt'
import { signAccessToken } from '../utils/util.jwt'

export const loginController = async (req: Request, res: Response): Promise<void> => {
	await setLoginPublisher({ email: req.body.email })
	const { statusCode, message, data } = await getLoginSubscriber()

	if (statusCode >= 400) {
		streamBox(res, statusCode, {
			method: req.method,
			statusCode: statusCode,
			message: message
		})
	} else {
		verifyPassword(req.body.password, data.password)
			.then((success: boolean): void => {
				if (!success) {
					streamBox(res, 400, {
						method: req.method,
						status: 400,
						message: 'email/password is wrong'
					})
				} else {
					const accessToken = signAccessToken()(res, { id: data._id, email: data.email }, { expiresIn: '1d' })

					streamBox(res, statusCode, {
						method: req.method,
						status: statusCode,
						message: data.message,
						accessToken: accessToken
					})
				}
			})
			.catch((err) => {
				streamBox(res, 500, {
					method: req.method,
					status: 500,
					message: `Internal Server Error ${err}`
				})
			})
	}
}
