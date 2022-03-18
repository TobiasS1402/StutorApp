export interface IAppointment {
  _id?: number;
  location: string;
  description: string;
  userId: number;
  user?: Interfaces.User;
  timeslotId: number;
  timeslot?: Interfaces.Timeslot;
  review?: Interfaces.Review;
}

export interface IAppointmentInputDTO {
  _id?: number;
  location: string;
  description: string;
  userId: number;
  timeslotId: number;
}
