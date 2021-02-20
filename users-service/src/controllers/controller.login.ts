import { Request, Response } from 'express'
import { setLoginPublisher } from '../services/publisher/service.login'
import { getLoginSubscriber } from '../services/subscriber/service.login'
import { streamBox } from '../utils/util.stream'
import { verifyPassword } from '../utils/util.encrypt'
import { expressValidator } from '../utils/util.validator'

export const loginController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			status: res.statusCode,
			method: req.method,
			errors
		})
	} else {
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
						streamBox(res, statusCode, {
							method: req.method,
							status: statusCode,
							message: data.message
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
}
