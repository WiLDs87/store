import request from 'supertest';
import setupApp from '../../src/app';
import User from '../../src/app/models/user';

describe('Routes: Users', () => {
  const defaultAdmin = {
    username: 'admin',
    password: 'adminpass',
    role: 'admin'
  };
  let app;

  beforeAll(async () => {
    app = await setupApp();
  });

  beforeEach(async () => {
    const user = new User(defaultAdmin);
    user._id = '201ace2d9257f97aae143284';
    await User.deleteMany({});
    await user.save();
  });


  it('should generate a valid token', done => {
    request(app)
      .post(`/users/authenticate`)
      .send({
        username: 'admin',
        password: 'adminpass'
      })
      .end((err, res) => {
        expect(res.body).toHaveProperty('token');
        expect(res.status).toBe(200);
        done(err);
      });
  });

  it('should return unauthorized when the password does not match', done => {
    request(app)
      .post(`/users/authenticate`)
      .send({
        username: 'admin',
        password: 'wrongpassword'
      })
      .end((err, res) => {
        expect(res.status).toBe(401);
        done(err);
      });
  });

});
