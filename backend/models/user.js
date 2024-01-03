const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthError = require('../errs/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    type: String,
    default: 'Жак-Ив Кусто',
  },
  about: {
    minlength: 2,
    maxlength: 30,
    type: String,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      // eslint-disable-next-line object-shorthand, func-names
      validator: function (v) {
        // eslint-disable-next-line no-useless-escape
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(v);
      },
      message: 'Ссылка на аватар не доступна',
    },
  },
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Электронная почта введена неверно',
    },
  },
  password: {
    select: false,
    type: String,
    required: true,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Почта или пароль введены неверно'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Почта или пароль введены неверно'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
