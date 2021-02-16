import { Document } from 'mongoose'

export class CompaniesDTO extends Document {
	readonly companiesId?: String
	readonly companyName: String
	readonly email: String
	readonly password: String
	readonly location: String
	readonly phone: Number
	readonly photo?: String
	readonly bannerPhoto?: String
	readonly industry?: String
	readonly overview?: String
	readonly gallery?: string[]
	readonly role?: String
	readonly active?: Boolean
	readonly firstLogin?: any
	readonly lastLogin?: any
	readonly createdAt?: any
	readonly updatedAt?: any
}
