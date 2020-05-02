import express from 'express';
import dotenv from 'dotenv';
import acl from 'express-acl';
import routes from './app/routes/routes';
import database from './database/database';
import authMiddleware from './app/middlewares/auth';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const app = express();

acl.config({
  baseUrl: '/',
  path: 'config'
});

const configureExpress = () => {
  app.use(express.json());

  app.use(authMiddleware);
  app.use(acl.authorize.unless({ path: ['/users/authenticate', '/users'] }));

  app.use('/', routes);

  app.database = database;

  return app;
};

export default async () => {
  const app = configureExpress();
  await app.database.connect();

  return app;
};
