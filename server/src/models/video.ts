import { Document, Schema, model } from 'mongoose'
import { VideoVO } from '../vo'

export interface IVideo extends Document, VideoVO {
  userId: string
  name: string
}

const videoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true })

export const Video = model<IVideo>('Video', videoSchema, 'videos')
