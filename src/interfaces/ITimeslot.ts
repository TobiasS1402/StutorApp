export interface ITimeslot {
  _id?: number;
  startdate: Date;
  enddate: Date;
  lessonId: number;
  lesson?: Interfaces.Lesson;
}

export interface ITimeslotInputDTO {
  _id?: number;
  startdate: Date;
  enddate: Date;
  lessonId: number;
}
