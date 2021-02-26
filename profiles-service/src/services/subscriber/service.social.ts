import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'

export const initCreateSocialsSubscriber = async (): Promise<void> => {
	const createSocialsSubscriber = new Subscriber({ key: 'Profile' })
	const { id, socialNetworks }: any = await createSocialsSubscriber.getMap('csocials:service')
	const {
		facebook,
		twitter,
		instagram,
		linkedIn,
		behance,
		dribbble,
		gitHub,
		codepen,
		vimeo,
		youtube,
		pinterest,
		website
	} = socialNetworks
	try {
		const addVolunteer: ProfilesDTO = await profileSchema.findByIdAndUpdate(
			{ _id: id },
			{
				$set: {
					'socialNetworks.facebook': facebook,
					'socialNetworks.twitter': twitter,
					'socialNetworks.instagram': instagram,
					'socialNetworks.linkedIn': linkedIn,
					'socialNetworks.behance': behance,
					'socialNetworks.dribbble': dribbble,
					'socialNetworks.gitHub': gitHub,
					'socialNetworks.codepen': codepen,
					'socialNetworks.vimeo': vimeo,
					'socialNetworks.youtube': youtube,
					'socialNetworks.pinterest': pinterest,
					'socialNetworks.website': website
				}
			}
		)

		if (addVolunteer) {
			await setResponsePublisher({
				status: 403,
				message: 'add new socialNetworks failed, please try again'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: 'add new socialNetworks successfully'
			})
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
