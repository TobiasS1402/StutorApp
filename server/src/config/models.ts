import Course from "../models/Course.model";
import Lesson from "../models/Lesson.model";
import Timeslot from "../models/Timeslot.model";
import Study from "../models/Study.model";
import User from "../models/User.model";
import Appointment from "../models/Appointment.model";
import Review from "../models/Review.model";

export default {
  user: User,
  study: Study,
  course: Course,
  lesson: Lesson,
  timeslot: Timeslot,
  appointment: Appointment,
  review: Review,
};
