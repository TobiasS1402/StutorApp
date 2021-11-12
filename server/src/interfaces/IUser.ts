export interface IUser {
  _id?: number;
  email: string;
  username: string;
  avatar: string;
  wallet: string;
  studyId: number;
  study?: Interfaces.Study;
  year: number;
  description: string;
  language: string;
  pin: string;
  salt: string;
  lessons?: Interfaces.Lesson[];
}

export interface IUserInputDTO {
  _id?: number;
  email: string;
  username: string;
  avatar: string;
  wallet: string;
  studyId: number;
  year: number;
  description: string;
  language: string;
  pin: string;
}
