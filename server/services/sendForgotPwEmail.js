const jwt = require('jsonwebtoken');
const createTokenForEmail = require('./createTokenForEmail');
const verifyUserExists = require('./verifyUserExists');

const sendForgotPwEmail = (reqBody, nodemailerMailgun, connection) => {
  return new Promise((resolve, reject) => {
    if (!reqBody || !reqBody.email) {
      logError('no email provided to sendPwReset');
      return reject({ status: 400, error: 'Bad Request' });
    }
    if (!nodemailerMailgun || !connection) {
      logError('no nodemailerMailgun || connection provided to sendPwReset');
      return reject({ status: 500, error: 'Bad Request' });
    }

    const { email } = reqBody;
    const apiUrl = reqBody.apiUrl || 'https://MySightWords.com';

    verifyUserExists(email, connection)
      .then(() => createTokenForEmail(email, jwt))
      .then(token => {
        const mgOptions = {
          from: 'no-reply@MySightWords.com',
          to: email,
          subject: 'MySightWords.com Password Reset',
          'h:Reply-To': 'no-reply@mySightWords.com',
          html: `
            Here is your password reset link:&nbsp;
            <a href="${apiUrl}/account/resetpassword?${token}">
              ${apiUrl}/account/resetpassword?${token}
            </a>`
        };

        nodemailerMailgun.sendMail(mgOptions, err => {
          if (err) {
            logError(err, 'nodemailer error in sendPwReset');
            return reject({ status: 500, error: 'Error Sending Email' });
          }
          resolve('ok');
        });
      })
      .catch(err => {
        logError(err, 'in sendForgotPwEmail');
        reject(err);
      });
  });
};

module.exports = sendForgotPwEmail;
