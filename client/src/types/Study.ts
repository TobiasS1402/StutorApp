import type { Course } from './Course'

export interface Study {
  _id: number
  name: string
  courses?: Course[]
}
