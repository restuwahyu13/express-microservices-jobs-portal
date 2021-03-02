import { createController } from './controller.create'
import { resultController } from './controller.result'
import { deleteController } from './controller.delete'
import { updateController } from './controller.update'
import { skillsDeleteController, skillsUpdateController } from './controller.skills'
import { volunteersDeleteController, volunteersUpdateController } from './controller.volunteers'

export const controller = {
	createController,
	skillsDeleteController,
	skillsUpdateController
}
