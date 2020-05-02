import mongoose from 'mongoose';
import Util from 'util';
import bcrypt from 'bcrypt';

const hashAsync = Util.promisify(bcrypt.hash);

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

schema.pre('save', async function(next) {
  const user = this;

  if (!user.password || !user.isModified('password')) {
    return next();
  }
  try {
    user.password = await hashAsync(user.password, 10);
  } catch (err) {
    next(err);
  }
});

schema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(err);
    next(null, isMatch);
  });
};

schema.set('toJSON', {
  transform: (doc, ret) => ({
    _id: ret._id,
    username: ret.username,
    role: ret.role
  })
});

const User = mongoose.model('User', schema);

export default User;
