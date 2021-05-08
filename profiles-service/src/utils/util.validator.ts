import { Request } from 'express'
import { check, validationResult, ValidationError, ValidationChain, Result } from 'express-validator'

export const expressValidator = (req: Request): ValidationError[] => {
	const errors: Result<ValidationError> = validationResult(req)

	const messages: ValidationError[] = []
	if (!errors.isEmpty()) {
		for (const i of errors.array()) {
			messages.push(i)
		}
	}
	return messages
}

export const userIdSchema = (): ValidationChain[] => [
	check('userId').notEmpty().withMessage('userId is required'),
	check('userId').isMongoId().withMessage('userId must be a mongoId format')
]

export const educationIdSchema = (): ValidationChain[] => [
	check('educationId').notEmpty().withMessage('educationId is required'),
	check('educationId').isMongoId().withMessage('educationId must be a mongoId format')
]

export const workIdSchema = (): ValidationChain[] => [
	check('workId').notEmpty().withMessage('workId is required'),
	check('workId').isMongoId().withMessage('workId must be a mongoId format')
]

export const volunterIdSchema = (): ValidationChain[] => [
	check('volunterId').notEmpty().withMessage('volunterId is required'),
	check('volunterId').isMongoId().withMessage('volunterId must be a mongoId format')
]

export const appreciationIdSchema = (): ValidationChain[] => [
	check('appreciationId').notEmpty().withMessage('appreciationId is required'),
	check('appreciationId').isMongoId().withMessage('appreciationId must be a mongoId format')
]

export const jobsIdSchema = (): ValidationChain[] => [
	check('jobId').notEmpty().withMessage('jobId is required'),
	check('jobId').isMongoId().withMessage('jobId must be a mongoId format')
]

export const meCreateSchema = (): ValidationChain[] => [
	check('userId').notEmpty().withMessage('userId is required'),
	check('userId').isUUID().withMessage('userId must be a uuid'),
	check('photo').isURL().optional().withMessage('photo cannot include unique character'),
	check('birthDate').isDate({ format: 'mm-dd-yyyy' }).optional().withMessage('birthDate must be a date'),
	check('gender')
		.not()
		.custom((val: string) => /[^a-zA-Z\s-]/gi.test(val))
		.optional()
		.withMessage('gender cannot include unique character'),
	check('status')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('status cannot include unique character'),
	check('nationality')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('nationality cannot include unique character'),
	check('aboutme')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('aboutme cannot include unique character'),
	check('resume').isURL().optional().withMessage('resume cannot include unique character'),
	check('skills').notEmpty().withMessage('skills is required'),
	check('skills').isArray().withMessage('skills must be a array'),
	check('workExperiences.*.companyName').notEmpty().withMessage('companyName is required'),
	check('workExperiences.*.companyName')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('jobPosition cannot include unique character'),
	check('workExperiences.*.jobPosition').notEmpty().withMessage('jobPosition is required'),
	check('workExperiences.*.jobPosition')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('jobPosition cannot include unique character'),
	check('workExperiences.*.startDate').notEmpty().withMessage('startDate is required'),
	check('workExperiences.*.startDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('startDate must be a date'),
	check('workExperiences.*.endDate').notEmpty().withMessage('endDate is required'),
	check('workExperiences.*.endDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('endDate must be a date'),
	check('workExperiences.*.workInformation').notEmpty().withMessage('workInformation is required'),
	check('workExperiences.*.workInformation').isString().withMessage('workInformation must be a string'),
	check('educations.*.institutionName').notEmpty().withMessage('institutionName is required'),
	check('educations.*.institutionName')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('institutionName cannot include unique character'),
	check('educations.*.educationDegree').notEmpty().withMessage('educationDegree is required'),
	check('educations.*.educationDegree')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('educationDegree cannot include unique character'),
	check('educations.*.fieldStudy').notEmpty().withMessage('fieldStudy is required'),
	check('educations.*.fieldStudy')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('fieldStudy cannot include unique character'),
	check('educations.*.startDate').notEmpty().withMessage('startDate is required'),
	check('educations.*.startDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('startDate must be a date'),
	check('educations.*.endDate').notEmpty().withMessage('endDate is required'),
	check('educations.*.endDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('endDate must be a date'),
	check('educations.*.educationInformation').notEmpty().withMessage('educationInformation is required'),
	check('educations.*.educationInformation').isString().withMessage('educationInformation must be a string'),
	check('jobPreferences.*.jobInterests').notEmpty().withMessage('jobInterests is required'),
	check('jobPreferences.*.jobInterests')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('jobInterests cannot include unique character'),
	check('jobPreferences.*.workTypes').notEmpty().withMessage('workTypes is required'),
	check('jobPreferences.*.workTypes')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('educationDegree cannot include unique character'),
	check('jobPreferences.*.salaryExpectation').notEmpty().withMessage('salaryExpectation is required'),
	check('jobPreferences.*.salaryExpectation').isNumeric().withMessage('salaryExpectation must be a number'),
	check('jobPreferences.*.workCityPreferences').notEmpty().withMessage('workCityPreferences is required'),
	check('jobPreferences.*.workCityPreferences')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('workCityPreferences cannot include unique character'),
	check('socialNetworks.*.facebook')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('facebook cannot include unique character'),
	check('socialNetworks.*.twitter')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('twitter cannot include unique character'),
	check('socialNetworks.*.instagram')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('instagram cannot include unique character'),
	check('socialNetworks.*.linkedIn')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('linkedIn cannot include unique character'),
	check('socialNetworks.*.behance')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('behance cannot include unique character'),
	check('socialNetworks.*.dribbble')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('dribbble cannot include unique character'),
	check('socialNetworks.*.github')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('github cannot include unique character'),
	check('socialNetworks.*.codepen')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('codepen cannot include unique character'),
	check('socialNetworks.*.vimeo')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('vimeo cannot include unique character'),
	check('socialNetworks.*.youtube')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('youtube cannot include unique character'),
	check('socialNetworks.*.pinterest')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('pinterest cannot include unique character'),
	check('socialNetworks.*.website')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('website cannot include unique character'),
	check('appreciations.*.awardTitle').notEmpty().withMessage('awardTitle is required'),
	check('appreciations.*.awardTitle')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('awardTitle cannot include unique character'),
	check('appreciations.*.achievementTitle').notEmpty().withMessage('achievementTitle is required'),
	check('appreciations.*.achievementTitle')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('achievementTitle cannot include unique character'),
	check('appreciations.*.awardYear').notEmpty().withMessage('awardYear is required'),
	check('appreciations.*.awardYear').isNumeric().withMessage('awardYear must be a number'),
	check('appreciations.*.awardInformation').isNumeric().withMessage('awardInformation is required'),
	check('appreciations.*.awardInformation').isNumeric().withMessage('awardInformation must be a string'),
	check('volunteerExperiences.*.organizationName').notEmpty().withMessage('organizationName is required'),
	check('volunteerExperiences.*.organizationName')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('organizationName cannot include unique character'),
	check('volunteerExperiences.*.organizationPosition').notEmpty().withMessage('organizationPosition is required'),
	check('volunteerExperiences.*.organizationPosition')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('organizationPosition cannot include unique character'),
	check('volunteerExperiences.*.startDate').notEmpty().withMessage('startDate is required'),
	check('volunteerExperiences.*.startDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('startDate must be a date'),
	check('volunteerExperiences.*.endDate').notEmpty().withMessage('endDate is required'),
	check('volunteerExperiences.*.endDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('endDate must be a date'),
	check('volunteerExperiences.*.organizationInformation').notEmpty().withMessage('organizationInformation is required'),
	check('volunteerExperiences.*.organizationInformation').isString().withMessage('organizationInformation must be a string')
]

export const meUpdateSchema = (): ValidationChain[] => [
	check('userId').notEmpty().withMessage('userId is required'),
	check('userId').isUUID().withMessage('userId must be a uuid'),
	check('photo').isURL().optional().withMessage('photo cannot include unique character'),
	check('birthDate').isDate({ format: 'mm-dd-yyyy' }).optional().withMessage('birthDate must be a date'),
	check('gender')
		.not()
		.custom((val: string) => /[^a-zA-Z\s-]/gi.test(val))
		.optional()
		.withMessage('gender cannot include unique character'),
	check('status')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('status cannot include unique character'),
	check('nationality')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('nationality cannot include unique character'),
	check('aboutme')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('aboutme cannot include unique character'),
	check('resume').isURL().optional().withMessage('resume cannot include unique character'),
	check('skills').notEmpty().withMessage('skills is required'),
	check('skills').isArray().withMessage('skills must be a array'),
	check('workExperiences.*.companyName').notEmpty().withMessage('companyName is required'),
	check('workExperiences.*.companyName')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('jobPosition cannot include unique character'),
	check('workExperiences.*.jobPosition').notEmpty().withMessage('jobPosition is required'),
	check('workExperiences.*.jobPosition')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('jobPosition cannot include unique character'),
	check('workExperiences.*.startDate').notEmpty().withMessage('startDate is required'),
	check('workExperiences.*.startDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('startDate must be a date'),
	check('workExperiences.*.endDate').notEmpty().withMessage('endDate is required'),
	check('workExperiences.*.endDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('endDate must be a date'),
	check('workExperiences.*.workInformation').notEmpty().withMessage('workInformation is required'),
	check('workExperiences.*.workInformation').isString().withMessage('workInformation must be a string'),
	check('educations.*.institutionName').notEmpty().withMessage('institutionName is required'),
	check('educations.*.institutionName')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('institutionName cannot include unique character'),
	check('educations.*.educationDegree').notEmpty().withMessage('educationDegree is required'),
	check('educations.*.educationDegree')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('educationDegree cannot include unique character'),
	check('educations.*.fieldStudy').notEmpty().withMessage('fieldStudy is required'),
	check('educations.*.fieldStudy')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('fieldStudy cannot include unique character'),
	check('educations.*.startDate').notEmpty().withMessage('startDate is required'),
	check('educations.*.startDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('startDate must be a date'),
	check('educations.*.endDate').notEmpty().withMessage('endDate is required'),
	check('educations.*.endDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('endDate must be a date'),
	check('educations.*.educationInformation').notEmpty().withMessage('educationInformation is required'),
	check('educations.*.educationInformation').isString().withMessage('educationInformation must be a string'),
	check('jobPreferences.*.jobInterests').notEmpty().withMessage('jobInterests is required'),
	check('jobPreferences.*.jobInterests')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('jobInterests cannot include unique character'),
	check('jobPreferences.*.workTypes').notEmpty().withMessage('workTypes is required'),
	check('jobPreferences.*.workTypes')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('educationDegree cannot include unique character'),
	check('jobPreferences.*.salaryExpectation').notEmpty().withMessage('salaryExpectation is required'),
	check('jobPreferences.*.salaryExpectation').isNumeric().withMessage('salaryExpectation must be a number'),
	check('jobPreferences.*.workCityPreferences').notEmpty().withMessage('workCityPreferences is required'),
	check('jobPreferences.*.workCityPreferences')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('workCityPreferences cannot include unique character'),
	check('socialNetworks.*.facebook')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('facebook cannot include unique character'),
	check('socialNetworks.*.twitter')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('twitter cannot include unique character'),
	check('socialNetworks.*.instagram')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('instagram cannot include unique character'),
	check('socialNetworks.*.linkedIn')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('linkedIn cannot include unique character'),
	check('socialNetworks.*.behance')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('behance cannot include unique character'),
	check('socialNetworks.*.dribbble')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('dribbble cannot include unique character'),
	check('socialNetworks.*.github')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('github cannot include unique character'),
	check('socialNetworks.*.codepen')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('codepen cannot include unique character'),
	check('socialNetworks.*.vimeo')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('vimeo cannot include unique character'),
	check('socialNetworks.*.youtube')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('youtube cannot include unique character'),
	check('socialNetworks.*.pinterest')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('pinterest cannot include unique character'),
	check('socialNetworks.*.website')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.optional()
		.withMessage('website cannot include unique character'),
	check('appreciations.*.awardTitle').notEmpty().withMessage('awardTitle is required'),
	check('appreciations.*.awardTitle')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('awardTitle cannot include unique character'),
	check('appreciations.*.achievementTitle').notEmpty().withMessage('achievementTitle is required'),
	check('appreciations.*.achievementTitle')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('achievementTitle cannot include unique character'),
	check('appreciations.*.awardYear').notEmpty().withMessage('awardYear is required'),
	check('appreciations.*.awardYear').isNumeric().withMessage('awardYear must be a number'),
	check('appreciations.*.awardInformation').isNumeric().withMessage('awardInformation is required'),
	check('appreciations.*.awardInformation').isNumeric().withMessage('awardInformation must be a string'),
	check('volunteerExperiences.*.organizationName').notEmpty().withMessage('organizationName is required'),
	check('volunteerExperiences.*.organizationName')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('organizationName cannot include unique character'),
	check('volunteerExperiences.*.organizationPosition').notEmpty().withMessage('organizationPosition is required'),
	check('volunteerExperiences.*.organizationPosition')
		.not()
		.custom((val: string) => /[^a-zA-Z\s]/gi.test(val))
		.withMessage('organizationPosition cannot include unique character'),
	check('volunteerExperiences.*.startDate').notEmpty().withMessage('startDate is required'),
	check('volunteerExperiences.*.startDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('startDate must be a date'),
	check('volunteerExperiences.*.endDate').notEmpty().withMessage('endDate is required'),
	check('volunteerExperiences.*.endDate').isDate({ format: 'mm-dd-yyyy' }).withMessage('endDate must be a date'),
	check('volunteerExperiences.*.organizationInformation').notEmpty().withMessage('organizationInformation is required'),
	check('volunteerExperiences.*.organizationInformation').isString().withMessage('organizationInformation must be a string')
]

export const skillsSchema = (): ValidationChain[] => []
export const applicationsSchema = (): ValidationChain[] => []
export const educationsSchema = (): ValidationChain[] => []
export const jobSchema = (): ValidationChain[] => []
export const volunteersSchema = (): ValidationChain[] => []
export const worksSchema = (): ValidationChain[] => []
