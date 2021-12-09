// eslint-disable-next-line import/no-cycle
import { ICourse } from './ICourse'
// eslint-disable-next-line import/no-cycle
import { IUser } from './IUser'

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
