export interface ILesson {
  _id?: number;
  description: string;
  timeframe: number;
  price: number;
  courseId: number;
  course?: Interfaces.Course;
  userId: number;
  user?: Interfaces.User;
  avgRating?: number;
}

export interface ILessonInputDTO {
  _id?: number;
  description: string;
  timeframe: number;
  price: number;
  courseId: number;
  userId: number;
}
