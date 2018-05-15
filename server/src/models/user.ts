import { Document, Schema, model } from 'mongoose'

export const enum UserRole {
  USER,
  ADMIN,
}

export interface IUser extends Document {
  _id: string
  username: string
  password: string
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
  password: {
    type: String,
    required: true,
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
