import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './app/routes/routes.js';
import database from './database/database.js';

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

const app = express();

const configureExpress = () => {

  app.use(bodyParser.json());
  app.use('/', routes);
  app.database = database;

  return app;
};

export default async () => {
  const app = configureExpress();
  await app.database.connect();

  return app;
};