import { Request, Response } from 'express'
import { setResultJobsPublisher } from '../../services/publisher/jobs-publisher/service.result'
import { streamBox } from '../../utils/util.stream'

export const resultJobsController = async (req: Request, res: Response): Promise<Response<any>> => {
	const { status, message, data } = setResultJobsPublisher()
}
