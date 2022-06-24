/**
 * Creates a Course object with the needed data
 */
export interface ICourse {
  _id?: number;
  name: string;
  studyId: number;
  study?: Interfaces.Study;
  lessons?: Interfaces.Lesson[];
}

/**
 * DTO for Course
 */
export interface ICourseInputDTO {
  _id?: number;
  name: string;
  studyId: number;
}
