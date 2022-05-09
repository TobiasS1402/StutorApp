/**
 * Creates an appointment object with the needed data
 */
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

/**
 * DTO for appointment
 */
export interface IAppointmentInputDTO {
  _id?: number;
  location: string;
  description: string;
  userId: number;
  timeslotId: number;
}
