import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  HasMany,
} from "sequelize-typescript";
import { IUser } from "../interfaces/IUser";
import Lesson from "./Lesson.model";
import Study from "./Study.model";

export interface UserModel extends Model<IUser>, IUser {}

@Table({ updatedAt: false })
class User extends Model<UserModel, IUser> {
  @PrimaryKey
  @AutoIncrement
  @Column
  _id: number;

  @Column
  email: string;

  @Column
  username: string;

  @ForeignKey(() => Study)
  @Column
  studyId: number;

  @BelongsTo(() => Study)
  study: Study;

  @Column
  year: number;

  @Column
  description: string;

  @Column
  pin: string;

  @Column
  salt: string;

  @Column
  avatar: string;

  @Column
  publicKey: string;

  @Column
  privateKey: string;

  @HasMany(() => Lesson)
  lessons: Lesson[];
}

export default User;
