/**
 * Creates a Timeslot object with the needed data
 */
export interface ITimeslot {
  _id?: number;
  startdate: Date;
  enddate: Date;
  lessonId: number;
  lesson?: Interfaces.Lesson;
}

/**
 * DTO for Timeslot
 */
export interface ITimeslotInputDTO {
  _id?: number;
  startdate: Date;
  enddate: Date;
  lessonId: number;
}
