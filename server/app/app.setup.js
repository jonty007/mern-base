import express from 'express';
import appMiddlewares from './app.middlewares';
import appRoutes from './app.routes';
import { logger } from './app.logger';
import { Server } from 'http';
const appErrorMiddleware = require('../middlewares/app_error');
const azureStorage = require('../boundaries/azure_storage');

// Initialize a server and create a express app
export function createApp(config) {

  const { azure } = config;

  azureStorage.init(azure)
  logger.info('Creating express server...');

  const app = express(),
    http_server = Server(app);

  /* Configures express middlewares, addons, routes */
  appMiddlewares(app);
  appRoutes(app);

  /* Catch all errors sent through next(err) */
  app.use(appErrorMiddleware);

  return { app, http_server };
}
