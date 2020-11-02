const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/user');
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, resp) => resp.json('Hello! This is the backend for PCS'));
app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);

 
app.use((error, _req, resp, _next) => {
  return resp.status(500).json({ error: error.toString() });
});

module.exports = app;