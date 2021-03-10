export interface ISkills {
	userId: string
	skills: string[] | string
}

export interface IEducations {
	userId: string
	educations: {
		educationId: string
		institutionName: string
		educationDegree: string
		fieldStudy: string
		startDate: any
		endDate: any
		educationInformation: string
	}
}

export interface IJobs {
	userId: string
	jobPreferences: {
		jobsId: string
		salaryExpectation: number
		jobInterests: string[] | string
		workTypes: string[] | string
		workCityPreferences: string[] | string
	}
}

export interface IVolunteers {
	userId: string
	volunteers: {
		volunteerId: string
		organizationName: string
		organizationPosition: string
		startDate: string
		endDate: string
		organizationInformation: string
	}
}

export interface IWorks {
	userId: string
	works: {
		workId: string
		companyName: string
		jobPosition: string
		startDate: string
		endDate: string
		workInformation: string
	}
}

export interface IAppreciations {
	userId: string
	appreciations: {
		appreciationId: string
		awardTitle: string
		achievementTitle: string
		awardYear: string
		awardInformation: string
	}
}
