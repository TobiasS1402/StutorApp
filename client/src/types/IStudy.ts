// eslint-disable-next-line import/no-cycle
import { ICourse } from './ICourse'

export interface IStudy {
  _id?: number
  name: string
  courses?: ICourse[]
}
