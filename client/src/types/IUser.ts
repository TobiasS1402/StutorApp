// eslint-disable-next-line import/no-cycle
import { ILesson } from './ILesson'
// eslint-disable-next-line import/no-cycle
import { IStudy } from './IStudy'

export interface IUser {
  _id?: number
  email: string
  username: string
  avatar: string
  wallet: string
  studyId: number
  study?: IStudy
  year: number
  description: string
  pin: string
  salt: string
  lessons?: ILesson[]
}
