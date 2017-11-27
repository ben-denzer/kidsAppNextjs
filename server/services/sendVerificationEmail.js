const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const mailgunAuth = require('../config/.mailgun_conf.js');
const jwt = require('jsonwebtoken');
const jwtInfo = require('../config/.jwtinfo').key;

const auth = {
  auth: {
    api_key: mailgunAuth.api_key,
    domain: mailgunAuth.domain
  }
};

const apiUrl = 'https://official-typing-test.com/';

const sendVerificationEmail = (reqBody, connection) => {
  let { apiUrl, email } = reqBody;
  if (!apiUrl) {
    apiUrl = 'https://official-typing-test.com';
  }
  if (!email) {
    logError('no email provided to sendVerificationEmail');
    return;
  }

  const token = jwt.sign({ email }, jwtInfo, { expiresIn: '7d' }, (err, token) => {
    if (err) {
      logError(err, `error sending verification email to ${email}`);
      return;
    }
    const nodemailerMailgun = nodemailer.createTransport(mg(auth));

    if (!nodemailerMailgun) {
      logError('nodemailerMailgun is undefined in sendVerificationEmail');
      return;
    }

    nodemailerMailgun.sendMail(
      {
        from: 'no-reply@official-typing-test.com',
        to: email,
        subject: 'Verify Your Official-Typing-Test.com Account',
        'h:Reply-To': 'no-reply@official-typing-test.com',
        html: `<a href="${apiUrl}/user/verifyAccount/${token}">${apiUrl}user/verifyAccount/${token}</a>`,
      }, (err, info) => {
        if (err) {
          logError(err, 'error sending email in sendVerificationEmail');
          return;
        }
      }
    );
    return;
  });
};

module.exports = sendVerificationEmail;
