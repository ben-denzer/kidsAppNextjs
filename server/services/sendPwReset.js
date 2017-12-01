const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const mailgunAuth = require('../keys/.mailgun_conf.js');
const jwt = require('jsonwebtoken');
const jwtInfo = require('../keys/.jwtinfo').key;

const auth = {
  auth: {
    api_key: mailgunAuth.api_key,
    domain: mailgunAuth.domain
  }
};

const sendPwReset = (reqBody, connection) => {
  const { apiUrl, email } = reqBody;

  return new Promise((resolve, reject) => {
    if (!email) {
      logError('no email provided to sendPwReset');
      return reject({ status: 400, error: 'Bad Request' });
    }

    connection.query(
      'SELECT u.username FROM users u WHERE u.email=?',
      [email],
      (err, rows) => {
        if (err) {
          logError(err, 'db error in sendPwReset #1');
          return reject({ status: 500, error: 'DB Error pw1' });
        }

        if (!rows || !rows.length || !rows[0].username) {
          // don't log
          return reject({ status: 401, error: 'We don\'t have that email address on file' });
        }

        const userOnAccount = rows[0].username;

        const token = jwt.sign({ email }, jwtInfo, { expiresIn: '2h' }, (err, token) => {
          const nodemailerMailgun = nodemailer.createTransport(mg(auth));

          if (!nodemailerMailgun) {
            logError('nodemailerMailgun is undefined in sendPwReset');
            return reject({ status: 500, error: 'Server Error 811' });
          }

          nodemailerMailgun.sendMail({
            from: 'no-reply@official-typing-test.com',
            to: email,
            subject: 'Official-Typing-Test.com Password Reset',
            'h:Reply-To': 'no-reply@official-typing-test.com',
            html: `The user associated with your email address is <b>${userOnAccount}</b>. Here is your password reset link: <a href="${apiUrl}/user/reset/${token}">${apiUrl}user/reset/${token}</a>`,
          }, (err, info) => {
            if (err) {
              logError(err, 'nodemailer error in sendPwReset');
              return reject({ status: 500, error: 'Error Sending Email' });
            }

            resolve(info);
          });
        });
      }
    );
  });
};

module.exports = sendPwReset;
