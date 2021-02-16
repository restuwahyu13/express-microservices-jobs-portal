import * as mongoose from 'mongoose'
import shortId from 'shortid'
import { ProfilesDTO } from '../dto/dto.profile'

const Schema: mongoose.Schema = new mongoose.Schema({
	profileId: {
		type: String,
		unique: true,
		trim: true,
		default: shortId()
	},
	userId: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'userId is required']
	},
	photo: {
		type: String,
		trim: true,
		default: 'default.jpg'
	},
	birthDate: {
		type: Date,
		trim: true,
		default: null
	},
	status: {
		type: String,
		trim: true,
		default: null
	},
	nationality: {
		type: String,
		trim: true,
		default: null
	},
	aboutMe: {
		type: String,
		trim: true,
		default: null
	},
	workExperience: {
		type: mongoose.Types.Map,
		unique: true,
		trim: true,
		default: [{}]
	},
	education: {
		type: mongoose.Types.Map,
		unique: true,
		trim: true,
		default: [{}]
	},
	skill: {
		type: mongoose.Types.Array,
		unique: true,
		trim: true,
		default: []
	},
	interest: {
		type: mongoose.Types.Map,
		unique: true,
		trim: true,
		default: [{}]
	},
	resume: {
		type: String,
		trim: true,
		default: null
	},
	portofolio: {
		type: mongoose.Types.Map,
		unique: true,
		trim: true,
		default: [{}]
	},
	appreciation: {
		type: mongoose.Types.Map,
		unique: true,
		trim: true,
		default: [{}]
	},
	volunteerExperience: {
		type: mongoose.Types.Map,
		unique: true,
		trim: true,
		default: [{}]
	}
})

export const UserSchema = mongoose.model<ProfilesDTO>('profilesService', Schema)
