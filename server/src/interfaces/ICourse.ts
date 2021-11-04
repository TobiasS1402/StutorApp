export interface ICourse {
  _id?: number;
  name: string;
  studyId: number;
  study?: Interfaces.Study;
  lessons?: Interfaces.Lesson[];
}

export interface ICourseInputDTO {
  _id?: number;
  name: string;
  studyId: number;
}
