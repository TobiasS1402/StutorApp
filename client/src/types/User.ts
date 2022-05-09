import type { Lesson } from './Lesson'
import type { Study } from './Study'

export interface User {
  _id: number
  email: string
  username: string
  avatar: string
  wallet: string
  studyId: number
  study?: Study
  year: number
  description: string
  pin: string
  salt: string
  lessons?: Lesson[]
}
