import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

const mongodbUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?authSource=admin`;

const connect = () =>
  mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

export default {
  connect,
  connection: mongoose.connection
};
