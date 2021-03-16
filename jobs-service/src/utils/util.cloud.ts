import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

export { UploadApiResponse }

export const cloudStorage = (filename: string): Promise<Record<string, any>> => {
	return new Promise((resolve, reject) => {
		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			shorten: true,
			secure: true,
			ssl_detected: true
		})

		cloudinary.uploader
			.upload(filename, { resource_type: 'auto' })
			.then((response: UploadApiResponse) => resolve(response))
			.catch((error) => reject(error))
	})
}
