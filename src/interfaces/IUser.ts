export interface IUser {
  _id?: number;
  email: string;
  username: string;
  avatar: string;
  studyId: number;
  study?: Interfaces.Study;
  year: number;
  description: string;
  pin: string;
  salt: string;
  publicKey: string;
  privateKey: string;
  lessons?: Interfaces.Lesson[];
}

export interface IUserInputDTO {
  _id?: number;
  email: string;
  username: string;
  avatar: string;
  studyId: number;
  year: number;
  description: string;
  pin: string;
  publicKey: string;
}
