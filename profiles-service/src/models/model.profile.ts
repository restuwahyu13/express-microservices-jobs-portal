import mongoose, { Model } from 'mongoose'
import shortId from 'shortid'
import { ProfilesDTO } from '../dto/dto.profile'

const JobSchema: mongoose.Schema = new mongoose.Schema({
	profileId: {
		type: String,
		unique: true,
		trim: true,
		default: shortId()
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
	aboutMe: {
		type: String,
		trim: true,
		default: null
	},
	skills: {
		type: mongoose.Types.Array,
		unique: true,
		trim: true,
		default: []
	},
	resume: {
		type: String,
		trim: true,
		default: null
	},
	workExperience: [
		{
			companyName: {
				type: String,
				unique: true,
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
	education: [
		{
			institutionName: {
				type: String,
				unique: true,
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
		jobInterest: {
			type: mongoose.Types.Array,
			unique: true,
			trim: true,
			default: []
		},
		workType: {
			type: mongoose.Types.Array,
			unique: true,
			trim: true,
			default: []
		},
		salaryExpectations: {
			type: Number,
			trim: true,
			default: 0
		},
		workCityPreferences: {
			type: mongoose.Types.Array,
			unique: true,
			trim: true,
			default: []
		}
	},
	portofolio: {
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
		gitHub: {
			type: String,
			trim: true,
			default: null
		},
		codePen: {
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
		}
	},
	appreciation: [
		{
			awardTitle: {
				type: String,
				unique: true,
				trim: true,
				default: null
			},
			achievementTitle: {
				type: String,
				unique: true,
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
	volunteerExperience: [
		{
			organizationName: {
				type: String,
				unique: true,
				trim: true,
				default: null
			},
			organizationPosition: {
				type: String,
				trim: true,
				default: null
			},
			startDate: {
				type: String,
				trim: true,
				default: null
			},
			endDate: {
				type: String,
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

export const ProfileSchema: Model<ProfilesDTO> = mongoose.model('profilesService', JobSchema)
