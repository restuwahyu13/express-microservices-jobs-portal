import { registerController } from './auth-controller/controller.register'
import { loginController } from './auth-controller/controller.login'
import { activationController } from './auth-controller/controller.activation'
import { forgotController } from './auth-controller/controller.forgot'
import { resendController } from './auth-controller/controller.resend'
import { resetController } from './auth-controller/controller.reset'
import { resultCompaniesController } from './profile-controller/controller.result'
import { deleteCompaniesController } from './profile-controller/controller.delete'
import { updateCompaniesController } from './profile-controller/controller.update'
import { resultJobsPostController } from './jobs-controller/controller.result'
import { createJobsPostController } from './jobs-controller/controller.create'

export const controller = {
	registerController,
	loginController,
	activationController,
	forgotController,
	resendController,
	resetController,
	resultCompaniesController,
	deleteCompaniesController,
	updateCompaniesController,
	resultJobsPostController,
	createJobsPostController
}
