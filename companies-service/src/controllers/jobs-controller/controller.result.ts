import { Request, Response } from 'express'
import { companiesModel } from '../../models/model.companies'

export const resultJobsPostController = async (req: Request, res: Response): Promise<any> => {
	const resultJobsPostById = await companiesModel.aggregate([
		{
			$lookup: {
				from: 'jobsservices',
				localField: 'companyId',
				foreignField: 'companiesId',
				as: 'postJobs'
			}
		},
		{ $project: { '__v': 0, 'createdAt': 0, 'updatedAt': 0, 'postJobs.__v': 0 } },
		{ $sort: { 'postJobs.createdAt': 1 } },
		{ $match: { companyId: req.params.companiesId } }
	])

	return res.status(200).json({ data: resultJobsPostById })
}
