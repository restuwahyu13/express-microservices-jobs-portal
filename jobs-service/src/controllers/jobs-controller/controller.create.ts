import { Request, Response } from 'express'
import { setCreateJobsPublisher } from '../../services/publisher/jobs-publisher/service.create'
import { streamBox } from '../../utils/util.stream'

export const createJobsController = async (req: Request, res: Response): Promise<Response<any>> => {
	const { status, message } = setCreateJobsPublisher()
}
