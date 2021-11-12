import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import Container from "typedi";
import Appointment from "../models/Appointment.model";
import Review from "../models/Review.model";
import Timeslot from "../models/Timeslot.model";
import LoggerInstance from "./logger";

export default async (): Promise<boolean> => {
  if (process.env.NODE_ENV !== "development") return false; // Only for development

  /**
   * Load in all models
   */

  const db: Sequelize = Container.get("db");

  const userModel: Models.User = Container.get("userModel");
  const studyModel: Models.Study = Container.get("studyModel");
  const courseModel: Models.Course = Container.get("courseModel");
  const lessonModel: Models.Lesson = Container.get("lessonModel");
  const timeslotModel: Models.Timeslot = Container.get("timeslotModel");
  const appointmentModel: Models.Appointment =
    Container.get("appointmentModel");
  const reviewModel: Models.Review = Container.get("reviewModel");

  userModel.destroy({ where: {}, truncate: true });
  studyModel.destroy({ where: {}, truncate: true });
  courseModel.destroy({ where: {}, truncate: true });
  lessonModel.destroy({ where: {}, truncate: true });
  timeslotModel.destroy({ where: {}, truncate: true });
  appointmentModel.destroy({ where: {}, truncate: true });
  reviewModel.destroy({ where: {}, truncate: true });

  await db.query("UPDATE sqlite_sequence SET seq = 0");

  const studies: Interfaces.Study[] = [
    { name: "HBO-ICT" },
    { name: "Creative Business" },
    { name: "Accountancy" },
    { name: "Sportkunde" },
  ];

  await studyModel.bulkCreate(studies);

  const courses: Interfaces.Course[] = [
    { name: "Programming", studyId: 1 },
    { name: "Software Architecture", studyId: 1 },
    { name: "Advanced Software Design", studyId: 1 },
    { name: "Object Oriented Analysis", studyId: 1 },
    { name: "Patterns and Frameworks", studyId: 1 },
    { name: "Web Application Construction", studyId: 1 },
    { name: "Business Modelling", studyId: 2 },
    { name: "Digital Media Design", studyId: 2 },
    { name: "Introduction to Creative Business", studyId: 2 },
    { name: "Professional Development", studyId: 2 },
    { name: "Circular Innovation", studyId: 2 },
    { name: "Global Scale Up", studyId: 2 },
  ];

  await courseModel.bulkCreate(courses);

  const users: Partial<Interfaces.User>[] = [
    {
      email: "maurits.arissen@student.hu.nl",
      username: "Maurits",
      studyId: 1,
      year: 4,
      language: "nl",
    },
    {
      email: "bart.vantongeren@student.hu.nl",
      username: "Bart",
      studyId: 1,
      year: 4,
      language: "nl",
    },
    {
      email: "lucas.goncalvesfelicio@student.hu.nl",
      username: "Lucas",
      studyId: 2,
      year: 4,
      language: "en",
    },
    {
      email: "daan.franssen@student.hu.nl",
      username: "Daan",
      studyId: 3,
      year: 3,
      language: "nl",
    },
    {
      email: "erlend.vanderburg@student.hu.nl",
      username: "Erlend",
      studyId: 3,
      year: 3,
      language: "nl",
    },
    {
      email: "martijn.vandekraats@student.hu.nl",
      username: "Martijn",
      studyId: 4,
      year: 3,
      language: "nl",
    },
  ];

  await userModel.bulkCreate(users as Interfaces.User[]);

  const lessons: Interfaces.Lesson[] = [
    {
      description:
        "Hier worden de layers van het software partitioning model tot in den diepen uitgelegd",
      timeframe: 45,
      prijs: 10,
      courseId: 2,
      userId: 1,
    },
    {
      description: "De basics van python",
      timeframe: 30,
      prijs: 8,
      courseId: 1,
      userId: 1,
    },
    {
      description: "Tkinter uitleg voor eindopdracht van programmer",
      timeframe: 50,
      prijs: 12,
      courseId: 1,
      userId: 2,
    },
    {
      description: "Alle patterns worden uitgelegd in Java",
      timeframe: 30,
      prijs: 8,
      courseId: 5,
      userId: 2,
    },
    {
      description: "Hoe kies je de juiste typografie en de juiste color pallet",
      timeframe: 50,
      prijs: 13,
      courseId: 8,
      userId: 3,
    },
  ];

  await lessonModel.bulkCreate(lessons);

  const timeslots: Interfaces.Timeslot[] = [
    {
      startdate: new Date(2021, 9, 26, 10, 0, 0, 0),
      enddate: new Date(2021, 9, 26, 10, 45, 0, 0),
      lessonId: 2,
    },
    {
      startdate: new Date(2021, 9, 26, 11, 0, 0, 0),
      enddate: new Date(2021, 9, 26, 11, 45, 0, 0),
      lessonId: 2,
    },
    {
      startdate: new Date(2021, 9, 26, 12, 0, 0, 0),
      enddate: new Date(2021, 9, 26, 12, 45, 0, 0),
      lessonId: 2,
    },
  ];

  await timeslotModel.bulkCreate(timeslots);

  const appointments: Interfaces.Appointment[] = [
    {
      location: "Heidelberglaan 15",
      description: "Ik wil dat de eindopdracht besproken word",
      userId: 2,
      timeslotId: 2,
    },
    {
      location: "Heidelberglaan 15",
      description:
        "De lesstof van week 6 over for loops wil ik extra uitleg over",
      userId: 3,
      timeslotId: 1,
    },
  ];

  await appointmentModel.bulkCreate(appointments);

  const reviews: Interfaces.Review[] = [
    {
      rating: 5,
      appointmentId: 1,
    },
    {
      rating: 4,
      appointmentId: 2,
    },
  ];

  await reviewModel.bulkCreate(reviews);

  const data = await lessonModel.findOne({
    where: { _id: 2 },
    attributes: [
      "_id",
      [
        Sequelize.fn(
          "AVG",
          Sequelize.col("timeslots.appointment.review.rating")
        ),
        "avgRating",
      ],
    ],
    include: [
      {
        model: Timeslot,
        attributes: [],
        as: "timeslots",
        include: [
          {
            model: Appointment,
            attributes: [],
            as: "appointment",
            where: { _id: { [Op.ne]: null } },
            include: [
              {
                model: Review,
                attributes: [],
                as: "review",
              },
            ],
          },
        ],
      },
    ],
  });

  LoggerInstance.debug(JSON.stringify(data.toJSON()));

  return true;
};
