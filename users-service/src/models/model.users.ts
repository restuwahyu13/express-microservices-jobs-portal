import * as mongoose from 'mongoose'
import shortId from 'shortid'
import { UsersDTO } from '../dto/dto.users'

const Schema: mongoose.Schema = new mongoose.Schema({
	userId: {
		type: String,
		trim: true
	}
})

export const UserSchema = mongoose.model<UsersDTO>('usersService', Schema)
