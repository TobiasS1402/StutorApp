import "reflect-metadata";
import express from "express";

async function startServer() {
  const app = express();

  app
    .listen(3001, "0.0.0.0", () => {
      console.log(`Server listening on port: 3001`);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
