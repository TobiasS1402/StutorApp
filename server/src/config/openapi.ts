import path from "path";
import config from ".";

/**
 * Path descriptions for the current API calls
 */
export default {
  openapi: "3.0.0",
  info: {
    title: "Stutor Express API with OpenAPI",
    version: "0.1.0",
    description:
      "This is the Stutor API application made with Express and documented with OpenAPI",
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
    contact: {
      name: "Stutor",
      email: "maurits.arissen@student.hu.nl",
    },
  },
  servers: [
    {
      url: `${config.openapi.scheme}://${config.openapi.host}${
        config.openapi.port ? ":" + config.openapi.port : ""
      }/v1`,
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Manages authorisation",
    },
    {
      name: "User",
      description: "Handles user operations",
    },
    {
      name: "Study",
      description: "Handles study operations",
    },
    {
      name: "Course",
      description: "Handle course operations",
    },
    {
      name: "Lesson",
      description: "Handle lesson operations",
    },
    {
      name: "Timeslot",
      description: "Handle timeslot operations",
    },
    {
      name: "Appointment",
      description: "Handle appointment operations",
    },
  ],
  paths: {
    /**
     * Users path descriptions
     */
    "/users/me": {
      get: {
        tags: ["User"],
        summary: "Get user info for current user",
        operationId: "getCurrentUser",
        responses: {
          "404": {
            description: "User not found",
          },
        },
      },
    },
    "/users": {
      put: {
        tags: ["User"],
        summary: "Change user info for current user",
        operationId: "changeCurrentUser",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  studyId: {
                    type: "number",
                  },
                  year: {
                    type: "number",
                  },
                  avatar: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "404": {
            description: "User not found",
          },
        },
      },
    },
    "/users/pin": {
      put: {
        tags: ["User"],
        summary: "Change pin",
        operationId: "changeUserPin",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["pin"],
                properties: {
                  pin: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
        responses: {
          "400": {
            description: "User pin is invalid",
          },
          "404": {
            description: "User is not found",
          },
        },
      },
    },
    /**
     * Studies path descriptions
     */
    "/studies": {
      get: {
        tags: ["Study"],
        summary: "Get all studies",
        operationId: "getStudies",
        responses: {
          "404": {
            description: "No studies found",
          },
        },
      },
    },
    "/studies/{studyId}": {
      get: {
        tags: ["Study"],
        summary: "Get a specific study by id",
        operationId: "getStudy",
        parameters: [
          {
            name: "studyId",
            in: "path",
            required: true,
            type: "number",
          },
        ],
        responses: {
          "400": {
            description: "studyId is not a number",
          },
          "404": {
            description: "No study found",
          },
        },
      },
    },
    /**
     * Courses path descriptions
     */
    "/courses": {
      get: {
        tags: ["Course"],
        summary: "Get all courses",
        operationId: "getCourses",
        responses: {
          "404": {
            description: "No courses found",
          },
        },
      },
    },
    "/courses/study/{studyId}": {
      get: {
        tags: ["Course"],
        summary: "Get courses by study",
        operationId: "getCoursesByStudy",
        parameters: [
          {
            name: "studyId",
            in: "path",
            required: true,
            type: "number",
          },
        ],
        responses: {
          "400": {
            description: "studyId is not a number",
          },
          "404": {
            description: "No study or courses found",
          },
        },
      },
    },
    /**
     * Lessons path descriptions
     */
    "/lessons/{lessonId}": {
      get: {
        tags: ["Lesson"],
        summary: "Get lesson by id",
        operationId: "getLesson",
        parameters: [
          {
            name: "lessonId",
            in: "path",
            required: true,
            type: "number",
          },
        ],
        responses: {
          "400": {
            description: "lessonId is not a number",
          },
          "404": {
            description: "No lesson found",
          },
        },
      },
    },
    "/lessons/course/{courseId}": {
      get: {
        tags: ["Lesson"],
        summary: "Get lessons by course",
        operationId: "getLessonsByCourse",
        parameters: [
          {
            name: "courseId",
            in: "path",
            required: true,
            type: "number",
          },
        ],
        responses: {
          "400": {
            description: "courseId is not a number",
          },
          "404": {
            description: "No lessons or course found",
          },
        },
      },
    },
    /**
     * Timeslots path descriptions
     */
    "/timeslots/{timeslotId}": {
      get: {
        tags: ["Timeslot"],
        summary: "Get timeslot by id",
        operationId: "getTimeslot",
        parameters: [
          {
            name: "timeslotId",
            in: "path",
            required: true,
            type: "number",
          },
        ],
        responses: {
          "400": {
            description: "timeslotId is not a number",
          },
          "404": {
            description: "No timeslot found",
          },
        },
      },
    },
    "/timeslots/lesson/{lessonId}": {
      get: {
        tags: ["Timeslot"],
        summary: "Get timeslots by lesson",
        operationId: "getTimeslotsByLesson",
        parameters: [
          {
            name: "lessonId",
            in: "path",
            required: true,
            type: "number",
          },
        ],
        responses: {
          "400": {
            description: "lessonId is not a number",
          },
          "404": {
            description: "No timeslots or lesson found",
          },
        },
      },
    },
    /**
     * Appointments path descriptions
     */
    "/appointments/me": {
      get: {
        tags: ["Appointment"],
        summary: "Get appointments from this week",
        operationId: "getAppointmentsWeek",
        responses: {
          "404": {
            description: "No appointments found",
          },
        },
      },
    },
    "/appointments": {
      post: {
        tags: ["Appointment"],
        summary: "Create appointment",
        operationId: "createAppointment",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["location", "description", "timeslotId"],
                properties: {
                  location: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  timeslotId: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
        responses: {
          "404": {
            description: "No timeslot found",
          },
          "409": {
            description: "Timeslot already has a reservation",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};
