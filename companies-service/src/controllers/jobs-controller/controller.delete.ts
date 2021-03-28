import { Request, Response } from 'express'
import { streamBox } from '../../utils/util.stream'
import { expressValidator } from '../../utils/util.validator'
import { setPipelineSpeaker } from '../../utils/util.speaker'
import { httpClient } from '../../utils/util.http'

export const deleteJobsPostController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		await setPipelineSpeaker('speaker:delete:companies:to:jobs', {
			jobsId: req.params.jobsId,
			companiesId: req.params.companiesId
		})
		try {
			const { data } = await httpClient(`${process.env.JOBS_URI}/companies/${req.params.companiesId}/jobs/${req.params.jobsId}`, {
				method: 'DELETE',
				headers: { 'authorization': req.headers.authorization, 'content-type': 'application/json' }
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
