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
	readonly workExperience?: number
	readonly education?: Record<string, any>
	readonly skills?: string[]
	readonly socialNetwork?: Record<string, any>
	readonly appreciation?: Record<string, any>
	readonly volunteerExperience?: Record<string, any>
}
