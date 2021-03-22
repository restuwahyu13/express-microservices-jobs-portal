import { Request, Response } from 'express'
import { setResultJobsPostCompaniesPublisher } from '../../services/publisher/jobs-publisher/service.result'
import { initResultJobsPostCompaniesSubscriber } from '../../services/subscriber/jobs-subscriber/service.result'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'
import { expressValidator } from '../../utils/util.validator'

export const updateJobsPostController = async (req: Request, res: Response): Promise<void> => {}
