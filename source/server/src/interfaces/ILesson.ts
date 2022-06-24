/**
 * Creates a Lesson object with the needed data
 */
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

/**
 * DTO for Lesson
 */
export interface ILessonInputDTO {
  _id?: number;
  description: string;
  timeframe: number;
  price: number;
  courseId: number;
  userId: number;
}
