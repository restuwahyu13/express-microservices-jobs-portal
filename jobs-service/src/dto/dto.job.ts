import { Document } from 'mongoose'

export class JobsDTO extends Document {
readonly jobsId?: string
readonly companiesId?: string
readonly position?: string
readonly category?: string
readonly workingTime?: string
readonly experince?: string
readonly description?: string
readonly skills?: string[]
readonly createdAt?: any
readonly updatedAt?: any
}
