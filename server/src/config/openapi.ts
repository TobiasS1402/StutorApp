import path from "path";
import config from ".";

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
          "404": {
            description: "No study found",
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
