import { Request, Response } from 'express'
import { setUpdateJobsPublisher } from '../../services/publisher/jobs-publisher/service.update'
import { streamBox } from '../../utils/util.stream'

export const updateJobsController = async (req: Request, res: Response): Promise<Response<any>> => {
	const { status, message } = setUpdateJobsPublisher()
}
