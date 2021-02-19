import { registerController } from '../controllers/controller.register'
import { loginController } from '../controllers/controller.login'
import { activationController } from '../controllers/controller.activation'
import { resendController } from '../controllers/controller.resend'

export const controller = {
	registerController,
	loginController,
	activationController,
	resendController
}
