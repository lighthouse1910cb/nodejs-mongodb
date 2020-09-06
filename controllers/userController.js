const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const tokenExpiredTime = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, 'nehozun secret', {
    expiresIn: tokenExpiredTime,
  });
};

const register_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      maxAge: tokenExpiredTime * 1000,
    });
    res.status(201).json({ user: user._id, isSuccess: true, token });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors, isSuccess: false });
  }
};

const login_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.login({ email, password });
      const token = createToken(user._id);
      res.cookie('jwt', token, {
        maxAge: tokenExpiredTime * 1000,
      });
      res.status(200).json({ user: user._id, isSuccess: true, token });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ errors, isSuccess: false });
    }
  };

module.exports = {
  register_post,
  login_post
};
