import { registerController } from './auth-controller/controller.register'
import { loginController } from './auth-controller/controller.login'
import { activationController } from './auth-controller/controller.activation'
import { forgotController } from './auth-controller/controller.forgot'
import { resendController } from './auth-controller/controller.resend'
import { resetController } from './auth-controller/controller.reset'
import { resultUserController } from './profile-controller/controller.resultUser'
import { deleteUserController } from './profile-controller/controller.deleteUser'
import { updateUserController } from './profile-controller/controller.updateUser'

export const controller = {
	registerController,
	loginController,
	activationController,
	forgotController,
	resendController,
	resetController,
	resultUserController,
	deleteUserController,
	updateUserController
}
