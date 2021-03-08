import path from 'path'
import httpAuth from 'http-auth'

export const basicAuth = () => {
	const authBasic = httpAuth.basic({
		realm: 'Users Service',
		file: path.resolve(__dirname, '../../user.htpasswd'),
		msg401: JSON.stringify({
			method: 'GET',
			status: 401,
			message: 'Unautorization username or password incorrect'
		})
	})

	return authBasic
}
