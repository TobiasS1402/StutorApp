export interface ILesson {
  _id?: number;
  description: string;
  timeframe: number;
  prijs: number;
  courseId: number;
  course?: Interfaces.Course;
  userId: number;
  user?: Interfaces.User;
}

export interface ILessonInputDTO {
  _id?: number;
  description: string;
  timeframe: number;
  prijs: number;
  courseId: number;
  userId: number;
}
