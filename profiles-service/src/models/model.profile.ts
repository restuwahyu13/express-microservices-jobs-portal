import mongoose, { Model } from 'mongoose'
import { v4 as uuid } from 'uuid'
import { ProfilesDTO } from '../dto/dto.profile'

const ProfileSchema: mongoose.Schema = new mongoose.Schema({
	profileId: {
		type: String,
		unique: true,
		trim: true,
		default: uuid()
	},
	userId: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'userId is required']
	},
	photo: {
		type: String,
		trim: true,
		default: 'default.jpg'
	},
	gender: {
		type: String,
		trim: true,
		default: null
	},
	birthDate: {
		type: Date,
		trim: true,
		default: null
	},
	status: {
		type: String,
		trim: true,
		default: null
	},
	nationality: {
		type: String,
		trim: true,
		default: null
	},
	aboutme: {
		type: String,
		trim: true,
		default: null
	},
	resume: {
		type: String,
		trim: true,
		default: null
	},
	skills: {
		type: Array,
		trim: true,
		default: []
	},
	workExperiences: [
		{
			workId: {
				type: String,
				unique: true,
				trim: true,
				default: uuid()
			},
			companyName: {
				type: String,
				trim: true,
				default: null
			},
			jobPosition: {
				type: String,
				trim: true,
				default: null
			},
			startDate: {
				type: Date,
				trim: true,
				default: null
			},
			endDate: {
				type: Date,
				trim: true,
				default: null
			},
			workInformation: {
				type: String,
				trim: true,
				default: null
			}
		}
	],
	educations: [
		{
			educationId: {
				type: String,
				unique: true,
				trim: true,
				default: uuid()
			},
			institutionName: {
				type: String,
				trim: true,
				default: null
			},
			educationDegree: {
				type: String,
				trim: true,
				default: null
			},
			fieldStudy: {
				type: String,
				trim: true,
				default: null
			},
			startDate: {
				type: Date,
				trim: true,
				default: null
			},
			endDate: {
				type: Date,
				trim: true,
				default: null
			},
			educationInformation: {
				type: String,
				trim: true,
				default: null
			}
		}
	],
	jobPreferences: {
		jobId: {
			type: String,
			unique: true,
			trim: true,
			default: uuid()
		},
		jobInterests: {
			type: Array,
			trim: true,
			default: []
		},
		workTypes: {
			type: Array,
			trim: true,
			default: []
		},
		salaryExpectation: {
			type: Number,
			trim: true,
			default: 0
		},
		workCityPreferences: {
			type: Array,
			trim: true,
			default: []
		}
	},
	socialNetworks: {
		facebook: {
			type: String,
			trim: true,
			default: null
		},
		twitter: {
			type: String,
			trim: true,
			default: null
		},
		instagram: {
			type: String,
			trim: true,
			default: null
		},
		linkedIn: {
			type: String,
			trim: true,
			default: null
		},
		behance: {
			type: String,
			trim: true,
			default: null
		},
		dribbble: {
			type: String,
			trim: true,
			default: null
		},
		github: {
			type: String,
			trim: true,
			default: null
		},
		codepen: {
			type: String,
			trim: true,
			default: null
		},
		vimeo: {
			type: String,
			trim: true,
			default: null
		},
		youtube: {
			type: String,
			trim: true,
			default: null
		},
		pinterest: {
			type: String,
			trim: true,
			default: null
		},
		website: {
			type: String,
			trim: true,
			default: null
		}
	},
	appreciations: [
		{
			appreciationId: {
				type: String,
				unique: true,
				trim: true,
				default: uuid()
			},
			awardTitle: {
				type: String,
				trim: true,
				default: null
			},
			achievementTitle: {
				type: String,
				trim: true,
				default: null
			},
			awardYear: {
				type: String,
				trim: true,
				default: null
			},
			awardInformation: {
				type: String,
				trim: true,
				default: null
			}
		}
	],
	volunteerExperiences: [
		{
			volunteerId: {
				type: String,
				unique: true,
				trim: true,
				default: uuid()
			},
			organizationName: {
				type: String,
				trim: true,
				default: null
			},
			organizationPosition: {
				type: String,
				trim: true,
				default: null
			},
			startDate: {
				type: Date,
				trim: true,
				default: null
			},
			endDate: {
				type: Date,
				trim: true,
				default: null
			},
			organizationInformation: {
				type: String,
				trim: true,
				default: null
			}
		}
	]
})

export const profileSchema: Model<ProfilesDTO> = mongoose.model('profilesService', ProfileSchema)
