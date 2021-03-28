import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { jobsSchema } from '../../../models/model.job'
import { JobsDTO } from '../../../dto/dto.job'
import { IJobs } from '../../../interface/interface.jobs'

export const initDeleteEducationSubscriber = async (): Promise<void> => {
	const deleteEducationsSubscriber = new Subscriber({ key: 'Sub Profile' })
	const res: IJobs = await deleteEducationsSubscriber.getMap('deducations:service')

	// try {
	// 	const checkEducationExist: JobsDTO = await jobsSchema.findOne({
	// 		'educations.educationId': res.educations.educationId
	// 	})

	// 	if (!checkEducationExist) {
	// 		await setResponsePublisher({
	// 			status: 404,
	// 			message: `education id ${res.educations.educationId} is not exist, or deleted from owner`
	// 		})
	// 	} else {
	// 		const deleteEducations: JobsDTO = await jobsSchema.updateOne(
	// 			{ 'educations.educationId': res.educations.educationId },
	// 			{ $pull: { educations: { educationId: res.educations.educationId } } }
	// 		)

	// 		if (!deleteEducations) {
	// 			await setResponsePublisher({
	// 				status: 403,
	// 				message: `deleted education id ${res.educations.educationId} failed`
	// 			})
	// 		} else {
	// 			await setResponsePublisher({
	// 				status: 200,
	// 				message: `deleted education id ${res.educations.educationId} successfully`
	// 			})
	// 		}
	// 	}
	// } catch (error) {
	// 	await setResponsePublisher({
	// 		status: 500,
	// 		message: `internal server error: ${error}`
	// 	})
	// }
}
