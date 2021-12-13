import type { ILesson } from './ILesson'
import type { IStudy } from './IStudy'

export interface ICourse {
  _id?: number
  name: string
  studyId: number
  study?: IStudy
  lessons?: ILesson
}
