const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session'); // <<<<<<<<<<<<<
const SessionStore = require('connect-session-knex')(session); // <<<<<< first step

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');

const server = express();

const sessionConfig = {
  name: 'monkey',
  secret: 'super secret string',
  cookie: {
    maxAge: 60 * 60 * 1000, // aka 1 hour
    secure: false, //we dont want to secure https, just http. If production you say true
    httpOnly: true
  },
  resave: false, // avoids creating sessions that avent changed
  saveUninitailized: false, // prevents setting cookies automatically as per lawscookie: {
  store: new SessionStore ({ // this is what keeps user logged in for duration set in clearinterval. Otherwise the user would get logged out between pages
    knex: require('./database/dbConfig'),
    tablename: 'sessions',
    createtable: true,
    clearInterval: 60*60 *1000, // defaults to 60000, clears our expired sessions in millisecondsrs
    sidfieldname: 'sid', // this defaults you dont really need this
  })
}

server.use(session(sessionConfig));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  const username = req.session.username || 'stranger';
  res.send(`Hello ${username}!`);
  res.cookie('whatup', 'not much')
  res.json({ api: 'whats up' });
});

module.exports = server;
