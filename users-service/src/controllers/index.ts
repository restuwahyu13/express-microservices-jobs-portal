import { registerController } from '../controllers/controller.register'
import { loginController } from '../controllers/controller.login'
import { activationController } from '../controllers/controller.activation'
import { forgotController } from '../controllers/controller.forgot'
import { resendController } from '../controllers/controller.resend'
import { resetController } from '../controllers/controller.reset'
import { updateUserController } from './controller.updateUser'

export const controller = {
	registerController,
	loginController,
	activationController,
	forgotController,
	resendController,
	resetController,
	updateUserController
}
