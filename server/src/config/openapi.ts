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
      url: `${config.openapi.scheme}://${config.openapi.host}${config.port}/v1`,
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
