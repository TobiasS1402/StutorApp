import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import Course from "./Course.model";
import User from "./User.model";

export interface StudyModel extends Model<Interfaces.Study>, Interfaces.Study {}

@Table({ createdAt: false, updatedAt: false })
class Study extends Model<StudyModel, Interfaces.Study> {
  @PrimaryKey
  @AutoIncrement
  @Column
  _id: number;

  @Unique
  @Column
  name: string;

  @HasMany(() => Course)
  courses: Course[];

  @HasMany(() => User)
  users: User[];
}

export default Study;
