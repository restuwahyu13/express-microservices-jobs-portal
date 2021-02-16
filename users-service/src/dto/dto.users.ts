interface IUsers {
	userId?: string
	firstName: string
	lastName: string
	email: string
	password: string
	location: string
	phone: number
	role?: string
	active?: boolean
	firstLogin?: any
	lastLogin?: any
	createdAt?: any
	updatedAt?: any
}

export class UsersDTO implements IUsers {
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
