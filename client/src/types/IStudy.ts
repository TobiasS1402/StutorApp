import type { ICourse } from './ICourse'

export interface IStudy {
  _id?: number
  name: string
  courses?: ICourse[]
}
