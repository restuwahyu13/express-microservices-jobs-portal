import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { companiesModel } from '../../../models/model.companies'
import { CompaniesDTO } from '../../../dto/dto.companies'
import { ICompanies } from '../../../interface/interface.companies'

export const initResultsJobsPostCompaniesSubscriber = async (): Promise<void> => {
	const resultsCompaniesJobsSubscriber = new Subscriber({ key: 'Results Jobs Post Companies' })
	const res: ICompanies = await resultsCompaniesJobsSubscriber.getMap('companies:jobs:results:service')

	try {
		const checkJobsPostById: CompaniesDTO[] = await companiesModel.aggregate([
			{
				$lookup: {
					from: 'jobsservices',
					localField: 'companyId',
					foreignField: 'companiesId',
					as: 'postJobs'
				}
			},
			{
				$project: {
					'__v': 0,
					'email': 0,
					'password': 0,
					'phone': 0,
					'photo': 0,
					'bannerPhoto': 0,
					'industry': 0,
					'overview': 0,
					'gallery': 0,
					'role': 0,
					'active': 0,
					'firstLogin': 0,
					'lastLogin': 0,
					'createdAt': 0,
					'updatedAt': 0,
					'postJobs.__v': 0
				}
			},
			{ $match: { $and: [{ companyId: res.companiesId }, { 'postJobs.companiesId': res.companiesId }] } },
			{ $sort: { 'postJobs.createdAt': 1 } }
		])

		if (checkJobsPostById.length < 1) {
			await setResponsePublisher({
				status: 404,
				message: `jobs post from companies for this id ${res.companiesId} is not exist`
			})
		} else {
			const findJobsCount = checkJobsPostById[0].postJobs.length
			const mergeValue = Object.defineProperty(checkJobsPostById[0], 'totalJobs', {
				value: findJobsCount,
				writable: true,
				enumerable: true
			})

			await setResponsePublisher({
				status: 200,
				message: `jobs post from companies for this id ${res.companiesId}, ready to use`,
				data: mergeValue
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
