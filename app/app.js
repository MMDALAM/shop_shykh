const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const { PORT } = process.env;
const { LOCAL_MONGODB } = process.env;
const createError = require("http-errors");
const { AllRouters } = require("./router/router");
const cors = require("cors");
const { deleteFilePublic } = require("./utils/functions");

module.exports = class Application {
  constructor() {
    this.configServer();
    this.createSever();
    this.connectToMongoDB();
    this.createRoutes();
    this.errorHandling();
  }

  configServer() {
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
  }

  createSever() {
    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`run server in port ${PORT}`));
  }

  connectToMongoDB() {
    mongoose.Promise = global.Promise;
    mongoose.set("strictPopulate", true);
    mongoose.set("strictQuery", true);
    mongoose.connect(LOCAL_MONGODB);
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to DB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("mongoose disconnected to DB");
    });
  }

  createRoutes() {
    app.use(AllRouters);
  }

  errorHandling() {
    app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر پیدا نشد"));
    });
    app.use((error, req, res, next) => {
      const serverError = createError.BadRequest();
      const status = error.status || serverError.status;
      const message = error.message || serverError.message;
      if (req.files) {
        deleteFilePublic(req.files);
      }
      return res.status(status).json({
        status: status,
        message: message,
      });
    });
  }
};
