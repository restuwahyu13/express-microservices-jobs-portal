import { Document } from 'mongoose'

export class ProfilesDTO extends Document {
	readonly profileId?: string
	readonly userId: string
	readonly photo?: string
	readonly birthDate?: any
	readonly status?: string
	readonly nationality?: string
	readonly aboutme?: string
	readonly resume?: string
	readonly skills?: Array<string>
	readonly workExperience?: Array<Record<string, any>>
	readonly education?: Array<Record<string, any>>
	readonly jobPreferences?: Record<string, any>
	readonly socialNetwork?: Record<string, any>
	readonly appreciation?: Array<Record<string, any>>
	readonly volunteerExperience?: Array<Record<string, any>>
}
