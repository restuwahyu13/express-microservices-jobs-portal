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
	readonly workExperiences?: Array<Record<string, any>>
	readonly educations?: Array<Record<string, any>>
	readonly jobPreferences?: Record<string, any>
	readonly socialNetworks?: Record<string, any>
	readonly appreciations?: Array<Record<string, any>>
	readonly volunteerExperiences?: Array<Record<string, any>>
}
