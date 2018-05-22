import { Document, Schema, model } from 'mongoose'
import { UserVO } from '../vo'

export const enum UserRole {
  USER,
  ADMIN,
}

export interface IUser extends Document, UserVO {
  _id: string
  username: string
  nickname: string
  avatar: string
  password: string
  job: string
  city: string
  sex: string
  signature: string
  role: UserRole
  salt: string
  tokenSecret: string
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  nickname: {
    type: String,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  job: {
    type: String,
  },
  city: {
    type: String,
  },
  sex: {
    type: String,
  },
  signature: {
    type: String,
  },
  role: {
    type: Number,
    required: true,
    default: 0,
  },
  salt: {
    type: String,
    required: true,
  },
  tokenSecret: {
    type: String,
    default: '',
  },
}, { timestamps: true })

export const User = model<IUser>('User', userSchema, 'users')
