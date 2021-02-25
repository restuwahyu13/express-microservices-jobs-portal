export interface IProfile {
	readonly profileId?: string
	readonly userId?: string
	readonly photo?: string
	readonly gender?: string
	readonly birthDate?: any
	readonly status?: string
	readonly nationality?: string
	readonly aboutme?: string
	readonly workExperience?: number
	readonly education?: Record<string, any>
	readonly skills?: string[]
	readonly interest?: Record<string, any>
	readonly resume?: string
	readonly portofolio?: Record<string, any>
	readonly appreciation?: Record<string, any>
	readonly volunteerExperience?: Record<string, any>
}
