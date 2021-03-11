import * as mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'
import { CompaniesDTO } from '../dto/dto.companies'

const CompaniesSchema: mongoose.Schema = new mongoose.Schema({
	companyId: {
		type: String,
		unique: true,
		trim: true,
		default: uuid()
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
		required: [true, 'email is required'],
		default: null
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'password is required'],
		default: null
	},
	phone: {
		type: Number,
		unique: true,
		trim: true,
		required: [true, 'phone is required'],
		default: null
	},
	photo: {
		type: String,
		trim: true,
		default: 'default.jpg'
	},
	bannerPhoto: {
		type: String,
		trim: true,
		default: 'banner_default.jpg'
	},
	industry: {
		type: String,
		trim: true,
		default: null
	},
	overview: {
		type: String,
		trim: true,
		default: null
	},
	gallery: {
		type: [],
		trim: true,
		default: []
	},
	role: {
		type: String,
		trim: true,
		default: 'companies'
	},
	active: {
		type: Boolean,
		default: false
	},
	firstLogin: {
		type: Date,
		default: null
	},
	lastLogin: {
		type: Date,
		trim: true,
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

export const companiesModel = mongoose.model<CompaniesDTO>('companiesService', CompaniesSchema)
