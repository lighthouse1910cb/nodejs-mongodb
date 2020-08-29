const mongoose = require('mongoose');
const { default: validator } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email is not valid'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password requires at least 8 characters'],
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function({email, password}) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('wrong email or password');
    }
    throw Error('wrong email or password');
  };

const User = mongoose.model('users', userSchema);

module.exports = User;
