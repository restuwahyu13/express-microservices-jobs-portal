export interface IBasic {
	readonly firstName: string
	readonly lastName: string
	readonly email: string
	readonly password: string
	readonly location: string
	readonly phone: number
	readonly profileId: string
	readonly userId: string
	readonly photo: string
	readonly gender: string
	readonly birthDate: any
	readonly status: string
	readonly nationality: string
	readonly aboutme: string
	readonly resume: string
	readonly skills: string[]
}

export interface IWorkExperince {
	readonly workExperience: [
		{
			readonly companyName: string
			readonly jobPosition: string
			readonly startDate: string
			readonly endDate: string
			readonly workInformation: string
		}
	]
}

export interface IEducation {
	readonly education: [
		{
			readonly institutionName: string
			readonly educationDegree: string
			readonly fieldStudy: string
			readonly startDate: string
			readonly endDate: string
			readonly educationInformation: string
		}
	]
}

export interface IJobsPreference {
	readonly jobInterest: string
	readonly workType: string
	readonly salaryExpectations: string
	readonly workCityPreferences: string
}

export interface ISocialNetworks {
	readonly facebook: string
	readonly twitter: string
	readonly instagram: string
	readonly linkedIn: string
	readonly behance: string
	readonly dribbble: string
	readonly gitHub: string
	readonly codepen: string
	readonly vimeo: string
	readonly youtube: string
	readonly pinterest: string
}

export interface IAppreciation {
	readonly awardTitle: string
	readonly achievementTitle: string
	readonly awardYear: string
	readonly awardInformation: string
}

export interface IVolunteerExperience {
	readonly organizationName: string
	readonly organizationPosition: string
	readonly startDate: string
	readonly endDate: string
	readonly organizationInformation: string
}

export interface IPayload {
	readonly payload: {
		readonly payloadBasicProfile: IBasic
		readonly payloadworkExperience: IWorkExperince
		readonly payloadEducation: IEducation
		readonly payloadJobsPreference: IJobsPreference
		readonly payloadSocialNetwork: ISocialNetworks
		readonly payloadAppreciation: IAppreciation
		readonly payloadVolunteerExperience: IVolunteerExperience
	}
}
