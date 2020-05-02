import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

class Auth {
  constructor(User) {
    this.User = User;
  }

  async authenticate(data) {
    const user = await this.User.findOne({ username: data.username });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return false;
    }

    return user;
  }

  static generateToken(payload) {
    return jwt.sign(payload, process.env.APP_SECRET, {
      expiresIn: '5d'
    });
  }
}

export default Auth;
