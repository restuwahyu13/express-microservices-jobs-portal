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
		unique: [true, 'companiesId must be a unique'],
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
		type: Array,
		trim: true,
		required: [true, 'jobsVancyLocation is required'],
		default: []
	},
	jobsVancySalary: {
		type: String,
		trim: true,
		required: [true, 'jobsVancySalary is required'],
		default: null
	},
	jobsVancyPosition: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyPosition is required'],
		default: null
	},
	jobsVancyCategory: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyCategory is required'],
		default: null
	},
	jobsVancyWorkingTime: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyWorkingTime is required'],
		default: null
	},
	jobsVancyExperince: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyExperince is required'],
		default: null
	},
	jobsVancyStatus: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyStatus is required'],
		default: null
	},
	jobsVancyDescription: {
		type: String,
		trim: true,
		required: [true, 'jobsVancyDescription is required'],
		default: null
	},
	jobsVancySkill: {
		type: Array,
		trim: true,
		required: [true, 'jobsVancyTags is required'],
		default: []
	},
	jobsVancyAllowances: {
		type: Array,
		trim: true,
		required: [true, 'jobsVancyAllowances is required'],
		default: []
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
