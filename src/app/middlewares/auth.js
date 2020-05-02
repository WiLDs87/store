import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { promisify } from 'util';

export default async (req, res, next) => {
  dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
  });

  const token = req.headers['x-access-token'];

  // call next middleware
  if (!token) {
    return next();
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    req.decoded = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is invalid' });
  }
};
