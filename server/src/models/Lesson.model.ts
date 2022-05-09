import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Course from "./Course.model";
import Timeslot from "./Timeslot.model";
import User from "./User.model";

export interface LessonModel
  extends Model<Interfaces.Lesson>,
    Interfaces.Lesson {}

/**
 * Creates Lesson table in database
 */
@Table({ createdAt: false, updatedAt: false })
class Lesson extends Model<LessonModel, Interfaces.Lesson> {
  @PrimaryKey
  @AutoIncrement
  @Column
  _id: number;

  @Column
  description: string;

  @Column
  timeframe: number;

  @Column
  price: number;

  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Timeslot)
  timeslots: Timeslot[];
}

export default Lesson;
