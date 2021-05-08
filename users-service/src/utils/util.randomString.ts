import crypto from 'crypto'

export const randomString = (): string => crypto.randomBytes(10).toString('hex')
