import { Request, Response } from 'express'
import { setDeleteJobsPublisher } from '../../services/publisher/jobs-publisher/service.delete'
import { streamBox } from '../../utils/util.stream'

export const deleteJobsController = async (req: Request, res: Response): Promise<Response<any>> => {
	const { status, message } = setDeleteJobsPublisher()
}
