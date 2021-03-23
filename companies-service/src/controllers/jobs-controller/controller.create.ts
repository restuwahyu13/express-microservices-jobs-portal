import { Request, Response } from 'express'
import { streamBox } from '../../utils/util.stream'
import { httpClient } from '../../utils/util.http'
import { setPipelineSpeaker } from '../../utils/util.speaker'
import { expressValidator } from '../../utils/util.validator'

export const createJobsPostController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setPipelineSpeaker('speaker:companies:to:jobs', {
			companiesId: req.params.companiesId,
			jobsVancyLocation: req.body.jobsVancyLocation,
			jobsVancySalary: { from: req.body.jobsVancySalary.from, to: req.body.jobsVancySalary.to },
			jobsVancyPosition: req.body.jobsVancyPosition,
			jobsVancyCategory: req.body.jobsVancyCategory,
			jobsVancyWorkingTime: req.body.jobsVancyWorkingTime,
			jobsVancyExperince: { from: req.body.jobsVancyExperince.from, to: req.body.jobsVancyExperince.to },
			jobsVancyStatus: req.body.jobsVancyStatus,
			jobsVancyDescription: req.body.jobsVancyDescription,
			jobsVancySkill: [...req.body.jobsVancySkill],
			jobsVancyAllowances: [...req.body.jobsVancyAllowances],
			jobsVancyAdditionalSkill: [...req.body.jobsVancyAdditionalSkill]
		})
		try {
			const { data } = await httpClient(`${process.env.JOBS_URI}/companies/${req.params.companiesId}/jobs`, {
				headers: { authorization: req.headers.authorization }
			})
			streamBox(res, data.status, {
				method: req.method,
				status: data.status,
				message: data.message
			})
		} catch (error) {
			const err = error.response.data
			if (err.status >= 400) {
				streamBox(res, err.status, {
					method: req.method,
					status: err.status,
					message: err.message
				})
			}
		}
	}
}
