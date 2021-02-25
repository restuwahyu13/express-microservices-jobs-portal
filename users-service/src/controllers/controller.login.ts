import { Request, Response } from 'express'
import { setLoginPublisher } from '../services/publisher/service.login'
import { initLoginSubscriber } from '../services/subscriber/service.login'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'
import { expressValidator } from '../utils/util.validator'
import { verifyPassword } from '../utils/util.encrypt'
import { signAccessToken } from '../utils/util.jwt'

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
		await initLoginSubscriber()
		const { status, message, data } = await getResponseSubscriber()

		if (status >= 400) {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		} else {
			const accessToken = signAccessToken()(res, { id: data._id, email: data.email }, { expiresIn: '1d' })

			verifyPassword(req.body.password, data.password)
				.then((success: boolean): void => {
					if (!success) {
						streamBox(res, 400, {
							method: req.method,
							status: 400,
							message: 'email/password is wrong'
						})
					} else {
						streamBox(res, status, {
							method: req.method,
							status,
							message,
							...accessToken
						})
					}
				})
				.catch((err) => {
					streamBox(res, 500, {
						method: req.method,
						status,
						message: `Verify Password Error ${err}`
					})
				})
		}
	}
}
