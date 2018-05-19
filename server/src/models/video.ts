import { Document, Schema, model } from 'mongoose'

export interface IVideo extends Document {
  userId: string
  name: string
}

const videoSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true })

export const Video = model<IVideo>('Video', videoSchema, 'videos')
