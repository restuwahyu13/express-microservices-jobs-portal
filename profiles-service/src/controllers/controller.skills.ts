import { Request, Response } from 'express'
import { initDeleteSkillsSubscriber, initUpdateSkillsSubscriber } from '../services/subscriber/service.skills'
import { setDeleteSkillsPublisher, setUpdateSkillsPublisher } from '../services/publisher/service.skills'
import { getResponseSubscriber } from '../utils/util.message'
import { streamBox } from '../utils/util.stream'
import { expressValidator } from '../utils/util.validator'

export const skillsDeleteController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setDeleteSkillsPublisher({ userId: req.params.userId, skills: req.body.skills })
		await initDeleteSkillsSubscriber()
		const { status, message } = await getResponseSubscriber()

		if (status >= 400) {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		} else {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		}
	}
}

export const skillsUpdateController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setUpdateSkillsPublisher({ userId: req.params.userId, skills: req.body.skills })
		await initUpdateSkillsSubscriber()
		const { status, message } = await getResponseSubscriber()

		if (status >= 400) {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		} else {
			streamBox(res, status, {
				method: req.method,
				status,
				message
			})
		}
	}
}
