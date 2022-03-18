export interface IReview {
  _id?: number;
  rating: number;
  appointmentId: number;
  appointment?: Interfaces.Appointment;
}

export interface IReviewInputDTO {
  _id?: number;
  rating: number;
  appointmentId: number;
}
