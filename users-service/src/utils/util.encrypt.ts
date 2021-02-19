import bcrypt from 'bcryptjs'

export const hashPassword = (password: string): string => {
	return bcrypt.hashSync(password)
}

export const verifyPassword = (password: string, hashPassword: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hashPassword, (error, success) => {
			resolve(success)
			reject(error)
		})
	})
}
