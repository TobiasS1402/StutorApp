import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Review from "./Review.model";
import Timeslot from "./Timeslot.model";
import User from "./User.model";

export interface AppointmentModel
  extends Model<Interfaces.Appointment>,
    Interfaces.Appointment {}

/**
 * Creates Appointment table in database
 */
@Table({ createdAt: false, updatedAt: false })
class Appointment extends Model<AppointmentModel, Interfaces.Appointment> {
  @PrimaryKey
  @AutoIncrement
  @Column
  _id: number;

  @Column
  location: string;

  @Column(DataType.TEXT)
  description: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Timeslot)
  @Column
  timeslotId: number;

  @BelongsTo(() => Timeslot)
  timeslot: Timeslot;

  @HasOne(() => Review)
  review: Review;
}

export default Appointment;
