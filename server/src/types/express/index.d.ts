import { Model } from "sequelize-typescript";
import { BuildOptions } from "sequelize/types";
import { IAppointment } from "../../interfaces/IAppointment";
import { ICourse } from "../../interfaces/ICourse";
import { ILesson } from "../../interfaces/ILesson";
import { IStudy } from "../../interfaces/IStudy";
import { ITimeslot } from "../../interfaces/ITimeslot";
import { IUser } from "../../interfaces/IUser";
import { CourseModel } from "../../models/Course.model";
import { LessonModel } from "../../models/Lesson.model";
import { TimeslotModel } from "../../models/Timeslot.model";
import { StudyModel } from "../../models/Study.model";
import { UserModel } from "../../models/User.model";
import { AppointmentModel } from "../../models/Appointment.model";
import { IReview } from "../../interfaces/IReview";
import { ReviewModel } from "../../models/Review.model";

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser;
    }
  }

  namespace Models {
    export type User = typeof Model & {
      new (values?: Record<string, unknown>, options?: BuildOptions): UserModel;
    };
    export type Study = typeof Model & {
      new (
        values?: Record<string, unknown>,
        options?: BuildOptions
      ): StudyModel;
    };
    export type Course = typeof Model & {
      new (
        values?: Record<string, unknown>,
        options?: BuildOptions
      ): CourseModel;
    };
    export type Lesson = typeof Model & {
      new (
        values?: Record<string, unknown>,
        options?: BuildOptions
      ): LessonModel;
    };
    export type Timeslot = typeof Model & {
      new (
        values?: Record<string, unknown>,
        options?: BuildOptions
      ): TimeslotModel;
    };
    export type Appointment = typeof Model & {
      new (
        values?: Record<string, unknown>,
        options?: BuildOptions
      ): AppointmentModel;
    };
    export type Review = typeof Model & {
      new (
        values?: Record<string, unknown>,
        options?: BuildOptions
      ): ReviewModel;
    };
  }

  namespace Interfaces {
    export type User = IUser;
    export type Study = IStudy;
    export type Course = ICourse;
    export type Lesson = ILesson;
    export type Timeslot = ITimeslot;
    export type Appointment = IAppointment;
    export type Review = IReview;
  }
}
