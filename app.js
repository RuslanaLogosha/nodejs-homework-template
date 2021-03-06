const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/users');
const { HttpCode, Status } = require('./helpers/constants');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const PUBLIC_DIR = process.env.PUBLIC_DIR;

app.use(express.static(path.join(__dirname, PUBLIC_DIR)));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
});

module.exports = app;
