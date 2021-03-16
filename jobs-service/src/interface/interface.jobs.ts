type JobsVancyUsers = {
	userId?: string
	jobsApplicationStatus?: string
	jobsApplicationDescription?: string
}

type jobsVancySalary = {
	from?: number
	to?: number
}

type jobsVancyExperince = {
	from?: number
	to?: number
}

export interface IJobs {
	readonly jobsId?: string
	readonly companiesId?: string
	readonly jobsVancyUsers?: JobsVancyUsers
	readonly jobsVancyLocation?: string
	readonly jobsVancySalary?: jobsVancySalary
	readonly jobsVancyPosition?: string
	readonly jobsVancyCategory?: string
	readonly jobsVancyWorkingTime?: string
	readonly jobsVancyExperince?: jobsVancyExperince
	readonly jobsVancyStatus?: string
	readonly jobsVancyDescription?: string
	readonly jobsVancySkill?: string[]
	readonly jobsVancyAllowances?: string[]
	readonly jobsVancyAdditionalSkill?: string[]
	readonly createdAt?: any
	readonly updatedAt?: any
}
