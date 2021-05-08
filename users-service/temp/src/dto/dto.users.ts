import { Document } from 'mongoose'

export class UsersDTO extends Document {
	readonly userId?: string
	readonly firstName: string
	readonly lastName: string
	readonly email: string
	readonly password: string
	readonly location: string
	readonly phone: number
	readonly role?: string
	readonly active?: boolean
	readonly firstLogin?: any
	readonly lastLogin?: any
	readonly createdAt?: any
	readonly updatedAt?: any
}
