import * as mongoose from 'mongoose'
import shortId from 'shortid'
import { UsersDTO } from '../dto/dto.users'

const Schema: mongoose.Schema = new mongoose.Schema({
	id: {
		type: String,
		unique: true,
		default: shortId()
	}
})

const UserSchema = mongoose.model<mongoose.Document<UsersDTO>>('usersService', Schema)

export default UserSchema
