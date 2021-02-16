import { Document } from 'mongoose'

export class ProfilesDTO extends Document {
	readonly profileId?: string
	readonly userId: string
	readonly photo: string
	readonly birthDate: any
	readonly status: string
	readonly nationality: string
	readonly aboutMe: string
	readonly workExperience: number
	readonly education: Record<string, any>
	readonly skill: string[]
	readonly interest: Record<string, any>
	readonly resume: string
	readonly portofolio: Record<string, any>
	readonly appreciation: Record<string, any>
	readonly volunteerExperience: Record<string, any>
}
