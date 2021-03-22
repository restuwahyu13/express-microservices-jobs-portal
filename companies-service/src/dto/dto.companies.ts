import { Document } from 'mongoose'

export class CompaniesDTO extends Document {
	readonly companyId?: string
	readonly companyName?: string
	readonly email?: string
	readonly password?: string
	readonly location?: string
	readonly phone?: number
	readonly photo?: string
	readonly bannerPhoto?: string
	readonly industry?: string
	readonly overview?: string
	readonly gallery?: string[]
	readonly role?: string
	readonly active?: boolean
	readonly firstLogin?: any
	readonly lastLogin?: any
	readonly createdAt?: any
	readonly updatedAt?: any
	postJobs?: Record<string, any>[]
}
