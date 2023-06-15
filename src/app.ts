import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import displayRoutes from 'express-routemap';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { DataSource } from 'typeorm';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { LoginStrategy } from './auth/strategies/login.strategy';
import { API_VERSION, ConfigServer, LOG_FORMAT, NODE_ENV, PORT } from './config/config';
import { corsConfig } from './config/cors.config';
import { swaggerOptions } from './config/swagger.config';
import { Routes } from './interfaces/route.interface';
import { logger, stream } from './utils/logger';

class App extends ConfigServer {
  public app: express.Application;
  public env: string;
  public port: number;
  public server: any;

  constructor(routes: Routes[]) {
    super();
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = Number(PORT) || 5000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.passportUse();
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

  public passportUse() {
    return [new LoginStrategy().use, new JwtStrategy().use];
  }

  private async connectToDatabase(): Promise<DataSource | void> {
    // TODO: Inicializar la conexion
    return this.initConnect
      .then(() => {
        logger.info(`=================================`);
        logger.info(`==== DB Connection success!! ====`);
        logger.info(`=================================`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT ?? '../logs', { stream }));
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
    const configSwagger = swaggerJsdoc(swaggerOptions);
    this.app.use(`/api/${API_VERSION}/docs`, swaggerUi.serve, swaggerUi.setup(configSwagger));
  }

  private initializeErrorHandling() {
    // TODO: Initialize Error Handling
  }
}

export default App;
