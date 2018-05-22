import { Document, Schema, model, Types } from 'mongoose'
import { VideoVO } from '../vo'

export interface IVideo extends Document, VideoVO {
  userId: string
  name: string
}

const videoSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true })

export const Video = model<IVideo>('Video', videoSchema, 'videos')
