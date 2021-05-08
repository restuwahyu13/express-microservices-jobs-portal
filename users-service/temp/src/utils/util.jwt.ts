import { Request, Response } from 'express'
import jwt, { SignOptions } from 'jsonwebtoken'
import { Base64 } from 'js-base64'
import { IUser } from '../interface/interface.user'

export const signAccessToken = () => (res: Response, payload: IUser, options: SignOptions): string | any => {
	if (!payload) {
		return null
	} else {
		try {
			const accessToken: string = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN_SECRET, { ...options })
			const refreshToken: string = jwt.sign({ ...payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '90d' })

			const encodedAccessToken: string = Base64.encode(accessToken)
			const encodedRefreshToken: string = Base64.encode(refreshToken)

			res.cookie('refreshToken', `${encodedRefreshToken}`, { maxAge: 86400 * 90, httpOnly: true })

			return { accessToken: encodedAccessToken, refreshToken: encodedRefreshToken }
		} catch (error) {
			if (error) Promise.reject(new Error(error))
			else return
		}
	}
}

export const verifySignAccessToken = () => (token: string): string | any => {
	if (!Base64.isValid(token)) {
		return null
	} else {
		try {
			const decodedToken: string = Base64.decode(token)
			const decoded: string | any = jwt.verify(decodedToken, process.env.ACCESS_TOKEN_SECRET)
			return decoded
		} catch (error) {
			if (error) Promise.reject(new Error(error))
			else return
		}
	}
}

export const signRefreshToken = () => (req: Request): string | any => {
	const getToken: string = req.cookies.refreshToken

	if (!Base64.isValid(getToken) && !getToken) {
		return null
	} else {
		try {
			const decodedToken: string = Base64.decode(getToken)

			const { user_id, email }: string | any = jwt.verify(decodedToken, process.env.REFRESH_TOKEN_SECRET)
			const accessToken: string = jwt.sign({ user_id: user_id, email: email }, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: '90d'
			})

			const encodedAccessToken: string = Base64.encode(accessToken)
			return encodedAccessToken
		} catch (error) {
			if (error) Promise.reject(new Error(error))
			else return
		}
	}
}
