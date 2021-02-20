import { Request, Response } from 'express'
import { setResetPublisher } from '../services/publisher/service.reset'
import { getResetSubscriber } from '../services/subscriber/service.reset'
import { streamBox } from '../utils/util.stream'
import { verifySignAccessToken } from '../utils/util.jwt'
import { expressValidator } from '../utils/util.validator'

export const resetController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		// const activationToken = verifySignAccessToken()(req.params.token)
		// if (!activationToken) {
		// 	streamBox(res, 401, {
		// 		method: req.method,
		// 		status: 401,
		// 		message: 'activation token is not valid or expired, please forgot password again'
		// 	})
		// } else {
		// 	await setResetPublisher({ id: activationToken.id, password: req.body.password })
		// 	const { statusCode, message } = await getResetSubscriber()
		// 	if (statusCode >= 400) {
		// 		streamBox(res, statusCode, {
		// 			method: req.method,
		// 			status: statusCode,
		// 			message
		// 		})
		// 	} else {
		// 		streamBox(res, statusCode, {
		// 			method: req.method,
		// 			status: statusCode,
		// 			message
		// 		})
		// 	}
		// }
	}
}
