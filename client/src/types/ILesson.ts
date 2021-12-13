import type { ICourse } from './ICourse'
import type { IUser } from './IUser'

export interface ILesson {
  _id?: number
  description: string
  timeframe: number
  price: number
  courseId: number
  course?: ICourse
  userId: number
  user?: IUser
  avgRating?: number
}
