import authMiddleware from '../../../src/app/middlewares/auth';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

describe('AuthMiddleware', () => {

  it('should verify a JWT-token and call the next middleware', done => {

    const jwtToken = jwt.sign({ data: 'fakeData' }, process.env.APP_SECRET);
    const reqFake = {
      headers: {
        'x-access-token': jwtToken
      }
    };
    const resFake = {};
    authMiddleware(reqFake, resFake, done);
  });

  it('should call next middleware passing an error when the token validation fails', done => {

    const reqFake = {
      headers: {
        'x-access-token': 'invalid token'
      }
    };
    const resFake = {};
    authMiddleware(reqFake, resFake, err => {
      expect(err.message).toBe('Token is invalid');
      done();
    });
  });

  it('should call next middleware if no token', done => {

    const reqFake = {
      headers: {}
    };
    const resFake = {};
    authMiddleware(reqFake, resFake, done);
  });
});
