/**
 * Creates a Review object with the needed data
 */
export interface IReview {
  _id?: number;
  rating: number;
  appointmentId: number;
  appointment?: Interfaces.Appointment;
}

/**
 * DTO for Review
 */
export interface IReviewInputDTO {
  _id?: number;
  rating: number;
  appointmentId: number;
}
