import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Appointment from "./Appointment.model";

export interface ReviewModel
  extends Model<Interfaces.Review>,
    Interfaces.Review {}

/**
 * Creates Review table in database
 */
@Table({ createdAt: false, updatedAt: false })
class Review extends Model<ReviewModel, Interfaces.Review> {
  @PrimaryKey
  @AutoIncrement
  @Column
  _id: number;

  @Column
  rating: number;

  @ForeignKey(() => Appointment)
  @Column
  appointmentId: number;

  @BelongsTo(() => Appointment)
  appointment: Appointment;
}

export default Review;
