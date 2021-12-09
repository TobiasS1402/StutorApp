// eslint-disable-next-line import/no-cycle
import { ILesson } from './ILesson'
// eslint-disable-next-line import/no-cycle
import { IStudy } from './IStudy'

export interface ICourse {
  _id?: number
  name: string
  studyId: number
  study?: IStudy
  lessons?: ILesson
}
