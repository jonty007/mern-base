import { logger } from './app/app.logger';
import { createApp } from './app/app.setup';
import db from './db';

const config = require('./config');


// initialize database
db.init(config.database);

// Check DB connection 
db.connection
  .on('error', logger.error)
  .on('disconnected', () => {process.exit(1);})
  .once('open', () => (logger.info(`Database initialized`)));

const { app, http_server } = createApp(config);
export { app, http_server };

/*
  NOTE: app listen is through .bin/server
*/
