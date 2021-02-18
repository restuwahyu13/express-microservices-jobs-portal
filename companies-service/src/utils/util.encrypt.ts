import bcrypt from 'bcryptjs'

export const hashPassword = (password: string): string => {
	const salt: string = bcrypt.getSalt('10')
	return bcrypt.hashSync(salt)
}

export const verifyPassword = (password: string, hashPassword: string): Promise<any> => {
	return new Promise((resolve, _) => {
		bcrypt.compare(password, hashPassword, resolve)
	})
}
