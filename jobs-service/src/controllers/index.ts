import { createJobsController } from './jobs-controller/controller.create'
import { resultJobsController } from './jobs-controller/controller.result'
import { deleteJobsController } from './jobs-controller/controller.delete'
import { updateJobsController } from './jobs-controller/controller.update'

export const controller = {
	createJobsController,
	resultJobsController,
	deleteJobsController,
	updateJobsController
}
