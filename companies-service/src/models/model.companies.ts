import * as mongoose from 'mongoose'
import shortId from 'shortid'
import { CompaniesDTO } from '../dto/dto.companies'

const CompaniesSchema: mongoose.Schema = new mongoose.Schema({
	companiesId: {
		type: String,
		unique: true,
		trim: true,
		default: shortId()
	},
	companyName: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'companyName is required']
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'email is required']
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'password is required']
	},
	phone: {
		type: Number,
		unique: true,
		trim: true,
		required: [true, 'phone is required']
	}

	//  photo?: String
	//  bannerPhoto?: String
	//  industry?: String
	//  overview?: String
	//  gallery?: string[]
	//  role?: String
	//  active?: Boolean
	//  firstLogin?: any
	//  lastLogin?: any
	//  createdAt?: any
	//  updatedAt?: any
})

export const companiesModel = mongoose.model<CompaniesDTO>('companiesService', CompaniesSchema)
