import mongoose, { Model } from 'mongoose'
import { v4 as uuid } from 'uuid'
import { JobsDTO } from '../dto/dto.job'

const Schema = new mongoose.Schema({
	jobsId: {
		type: String,
		unique: [true, 'jobsId must be a unique'],
		trim: true,
		default: uuid()
	},
	companiesId: {
		type: String,
		trim: true,
		required: [true, 'companiesId is required'],
		ref: 'companiesService',
		default: null
	},
	jobsVancyUsers: [
		{
			userId: {
				type: String,
				unique: [true, 'userId must be a unique'],
				trim: true,
				ref: 'usersService',
				default: null
			},
			jobsApplicationStatus: {
				type: String,
				trim: true,
				default: null
			},
			jobsApplicationDescription: {
				type: String,
				trim: true,
				default: null
			}
		}
	],
	jobsVancyLocation: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyLocation is required']
	},
	jobsVancySalary: {
		from: {
			type: Number,
			trim: true,
			required: [true, 'jobsVancySalary.from is required']
		},
		to: {
			type: Number,
			trim: true,
			required: [true, 'jobsVancySalary.to is required']
		}
	},
	jobsVancyPosition: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyPosition is required']
	},
	jobsVancyCategory: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyCategory is required']
	},
	jobsVancyWorkingTime: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyWorkingTime is required']
	},
	jobsVancyExperince: {
		from: {
			type: Number,
			trim: true,
			required: [true, 'jobsVancyExperince.from is required']
		},
		to: {
			type: Number,
			trim: true,
			required: [true, 'jobsVancyExperince.to is required']
		}
	},
	jobsVancyStatus: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyStatus is required']
	},
	jobsVancyDescription: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyDescription is required']
	},
	jobsVancySkill: {
		type: Array,
		trim: true,
		required: [true, 'jobsVancyTags is required']
	},
	jobsVancyAllowances: {
		type: Array,
		trim: true,
		required: [true, 'jobsVancyAllowances is required']
	},
	jobsVancyAdditionalSkill: {
		type: Array,
		trim: true,
		default: []
	},
	createdAt: {
		type: Date,
		default: null
	},
	updatedAt: {
		type: Date,
		default: null
	}
})

export const jobsSchema: Model<JobsDTO> = mongoose.model('jobsService', Schema)
