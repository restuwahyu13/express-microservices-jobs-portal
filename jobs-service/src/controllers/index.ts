/**
 * @description  Jobs Post Controller
 */
import { createJobsController } from './jobs-controller/controller.create'
import { deleteJobsController } from './jobs-controller/controller.delete'
import { updateJobsController } from './jobs-controller/controller.update'

export const controller = {
	/**
	 * @description  Jobs Post Controller
	 */
	createJobsController,
	deleteJobsController,
	updateJobsController
}
