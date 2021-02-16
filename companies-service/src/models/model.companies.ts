import * as mongoose from 'mongoose'
import shortId from 'shortid'
import { CompaniesDTO } from '../dto/dto.companies'

const CompaniesSchema: mongoose.Schema = new mongoose.Schema({
	companyId: {
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
		type: mongoose.Types.Array,
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
		trim: true,
		default: false
	},
	firstLogin: {
		type: Date,
		trim: true,
		default: null
	},
	lastLogin: {
		type: Date,
		trim: true,
		default: null
	},
	createdAt: {
		type: Date,
		trim: true,
		default: null
	},
	updatedAt: {
		type: Date,
		trim: true,
		default: null
	}
})

export const companiesModel = mongoose.model<CompaniesDTO>('companiesService', CompaniesSchema)
