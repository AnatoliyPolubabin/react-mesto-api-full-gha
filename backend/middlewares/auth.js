const jwt = require('jsonwebtoken');
const AuthError = require('../errs/AuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthError('Авторизируетесь');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new AuthError('Авторизируетесь'));
  }
  req.user = payload;
  next();
};
