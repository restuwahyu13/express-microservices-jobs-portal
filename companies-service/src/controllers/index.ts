/**
 * @description Companies Account Controller
 */
import { registerController } from './auth-controller/controller.register'
import { loginController } from './auth-controller/controller.login'
import { activationController } from './auth-controller/controller.activation'
import { forgotController } from './auth-controller/controller.forgot'
import { resendController } from './auth-controller/controller.resend'
import { resetController } from './auth-controller/controller.reset'
/**
 * @description Companies Prorfile Controller
 */
import { resultCompaniesController } from './profile-controller/controller.result'
import { deleteCompaniesController } from './profile-controller/controller.delete'
import { updateCompaniesController } from './profile-controller/controller.update'
/**
 * @description Companies Jobs Post Controller
 */
import { createJobsPostController } from './jobs-controller/controller.create'
import { resultJobsPostController } from './jobs-controller/controller.result'
import { deleteJobsPostController } from './jobs-controller/controller.delete'
import { updateJobsPostController } from './jobs-controller/controller.update'

export const controller = {
	/**
	 * @description Companies Account Controller
	 */
	registerController,
	loginController,
	activationController,
	forgotController,
	resendController,
	resetController,
	/**
	 * @description Companies Prorfile Controller
	 */
	resultCompaniesController,
	deleteCompaniesController,
	updateCompaniesController,
	/**
	 * @description Companies Jobs Post Controller
	 */
	createJobsPostController,
	resultJobsPostController,
	deleteJobsPostController,
	updateJobsPostController
}
