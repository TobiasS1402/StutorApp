import type { Lesson } from './Lesson'
import type { Study } from './Study'

export interface Course {
  _id?: number
  name: string
  studyId: number
  study?: Study
  lessons?: Lesson
}
