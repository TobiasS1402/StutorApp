import type { Course } from './Course'
import type { User } from './User'

export interface Lesson {
  _id?: number
  description: string
  timeframe: number
  price: number
  courseId: number
  course?: Course
  userId: number
  user?: User
  avgRating?: number
}
