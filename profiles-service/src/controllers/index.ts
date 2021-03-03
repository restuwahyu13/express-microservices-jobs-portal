import { createController } from './controller.create'
import { resultController } from './controller.result'
import { deleteController } from './controller.delete'
import { updateController } from './controller.update'
import { skillsDeleteController, skillsUpdateController } from './controller.skills'
import { volunteersDeleteController, volunteersUpdateController } from './controller.volunteers'
import { jobsDeleteController, jobsUpdateController } from './controller.jobs'
import { educationsDeleteController, educationsUpdateController } from './controller.educations'
import { worksDeleteController, worksUpdateController } from './controller.works'

export const controller = {
	createController,
	skillsDeleteController,
	skillsUpdateController,
	volunteersDeleteController,
	volunteersUpdateController,
	jobsDeleteController,
	jobsUpdateController,
	educationsDeleteController,
	educationsUpdateController,
	worksDeleteController,
	worksUpdateController
}
