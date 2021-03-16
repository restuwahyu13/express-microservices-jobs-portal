type JobsVancyUsers = {
	userId?: string
	jobsApplicationStatus?: string
	jobsApplicationDescription?: string
}

export interface IJobs {
	readonly jobsId?: string
	readonly companiesId?: string
	readonly jobsVancyUsers?: JobsVancyUsers
	readonly jobsVancyLocation?: string
	readonly jobsVancySalary?: string
	readonly jobsVancyPosition?: string
	readonly jobsVancyCategory?: string
	readonly jobsVancyWorkingTime?: string
	readonly jobsVancyExperince?: string
	readonly jobsVancyStatus?: string
	readonly jobsVancyDescription?: string
	readonly jobsVancySkill?: string[]
	readonly jobsVancyAllowances?: string[]
	readonly jobsVancyAdditionalSkill?: string[]
	readonly createdAt?: any
	readonly updatedAt?: any
}
