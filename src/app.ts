import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import displayRoutes from "express-routemap";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

import { API_VERSION, LOG_FORMAT, NODE_ENV, PORT } from "./config/config";
import { corsConfig } from "./config/cors.config";
import { Routes } from "./interfaces/route.interface";
import { logger, stream } from "./utils/logger";

class App {
  public app: express.Application;
  public env: string;
  public port: number;
  public server: any;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = Number(PORT) || 5000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public getServer() {
    return this.app;
  }

  public closeServer(done?: any) {
    this.server = this.app.listen(this.port, () => {
      done();
    });
  }

  private connectToDatabase() {
    // TODO: Connect to database
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT ?? "../logs", { stream }));
    this.app.use(cors(corsConfig));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  public initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(`/api/${API_VERSION}`, route.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      displayRoutes(this.app);
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  private initializeSwagger() {
    // TODO: Initialize Swagger
  }

  private initializeErrorHandling() {
    // TODO: Initialize Error Handling
  }
}

export default App;
