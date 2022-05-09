import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import Lesson from "./Lesson.model";
import Study from "./Study.model";

export interface CourseModel
  extends Model<Interfaces.Course>,
    Interfaces.Course {}

/**
 * Creates Course table in database
 */
@Table({ createdAt: false, updatedAt: false })
class Course extends Model<CourseModel, Interfaces.Course> {
  @PrimaryKey
  @AutoIncrement
  @Column
  _id: number;

  @Unique
  @Column
  name: string;

  @ForeignKey(() => Study)
  @Column
  studyId: number;

  @BelongsTo(() => Study)
  study: Study;

  @HasMany(() => Lesson)
  lessons: Lesson[];
}

export default Course;
