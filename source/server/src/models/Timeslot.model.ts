import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Appointment from "./Appointment.model";
import Lesson from "./Lesson.model";

export interface TimeslotModel
  extends Model<Interfaces.Timeslot>,
    Interfaces.Timeslot {}

/**
 * Creates Timeslot table in database
 */
@Table({ createdAt: false, updatedAt: false })
class Timeslot extends Model<TimeslotModel, Interfaces.Timeslot> {
  @PrimaryKey
  @AutoIncrement
  @Column
  _id: number;

  @Column
  startdate: Date;

  @Column
  enddate: Date;

  @ForeignKey(() => Lesson)
  @Column
  lessonId: number;

  @BelongsTo(() => Lesson)
  lesson: Lesson;

  @HasOne(() => Appointment)
  appointment: Appointment;
}

export default Timeslot;
