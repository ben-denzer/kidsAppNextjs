const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('connect-mysql')(session);
const config = { user, password, database } = require('./.dbKeys');
const options = {
  pool: false,
  keeppalive: 1000,
  cleanup: true,
  config
};
const localStrategy = require('./strategies/local.strategy');

function runPassport(app, connection) {

  app.use(cookieParser());
  app.use(session({
    cookie: {
      maxAge: 2592000000
    },
    resave: false,
    saveUninitialized: false,
    secret: require('../config/.sessionSecret'),
    store: new MySQLStore(options)
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  localStrategy(connection);
}

module.exports = runPassport;
