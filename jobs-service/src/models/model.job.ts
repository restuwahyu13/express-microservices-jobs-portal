import mongoose, { Model } from 'mongoose'
import { v4 as uuid } from 'uuid'
import { JobsDTO } from '../dto/dto.job'

const Schema = new mongoose.Schema({
 jobsId: {
 	type: String,
 	unique: [true, 'jobsId must be a unique'],
 	trim: true,
 	required: [true, 'jobsId is required'],
 	default: uuid()
 },
 companiesId: {
 	type: String,
 	unique: [true, 'jobsId must be a unique'],
 	trim: true,
 	ref: "companiesService",
 	default: null
 },
 position: {
 	type: String,
 	trim: true,
 	required: [true, 'position is required'],
 	default: null
 },
 category: {
 	type: String,
 	trim: true,
 	required: [true, 'category is required'],
 	default: null
 },
 workingTime: {
 	type: String,
 	trim: true,
 	required: [true, 'workingTime is required'],
 	default: null
 },
 experince: {
 	type: String,
 	trim: true,
 	required: [true, 'experince is required'],
 	default: null
 },
 description: {
 	type: String,
 	trim: true,
 	required: [true, 'description is required'],
 	default: null
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

export const jobsSchema: Model<JobsDTO> = mongoose.mode('jobsService', Schema)