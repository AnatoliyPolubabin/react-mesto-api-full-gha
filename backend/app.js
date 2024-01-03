const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { validationLogin, validationCreateUser } = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);
app.use(routes);

mongoose.connect('mongodb://0.0.0.0/mestodb', { useNewUrlParser: true });

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Сервер запущен ${PORT}`);
});