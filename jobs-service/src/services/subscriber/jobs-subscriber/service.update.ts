import { v4 as uuid } from 'uuid'
import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { jobsSchema } from '../../../models/model.job'
import { JobsDTO } from '../../../dto/dto.job'
import { IJobs } from '../../../interface/interface.jobs'

export const initCreateMeSubscriber = async (): Promise<void> => {
	const createProfileSubscriber = new Subscriber({ key: 'Profile' })
	const res: IJobs = await createProfileSubscriber.getMap('cprofile:service')

	// try {
	// 	const saveProfile: JobsDTO = await jobsSchema.create({
	// 		userId: res.userId,
	// 		photo: res.photo,
	// 		birthDate: res.birthDate,
	// 		gender: res.gender,
	// 		status: res.status,
	// 		nationality: res.nationality,
	// 		aboutme: res.aboutme,
	// 		resume: res.resume,
	// 		skills: res.skills,
	// 		workExperiences: res.workExperiences,
	// 		educations: res.educations
	// 	})

	// 	if (!saveProfile) {
	// 		await setResponsePublisher({
	// 			status: 403,
	// 			message: 'add new profile failed, please try again'
	// 		})
	// 	} else {
	// 		await setResponsePublisher({
	// 			status: 200,
	// 			message: 'add new profile successfully'
	// 		})
	// 	}
	// } catch (error) {
	// 	await setResponsePublisher({
	// 		status: 500,
	// 		message: `internal server error: ${error}`
	// 	})
	// }
}
