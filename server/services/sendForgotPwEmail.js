import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import { apiKey, domain } from '../keys/.mailgun_conf.js';
import jwt from 'jsonwebtoken';
import createTokenForEmail from './createTokenForEmail';
import verifyUserExists from './verifyUserExists';
const mgAuth = {
  auth: { api_key: apiKey, domain } // eslint-disable-line camelcase
};
const nodemailerMailgun = nodemailer.createTransport(mg(mgAuth));

const sendForgotPwEmail = (reqBody, connection) => {
  const { email } = reqBody;
  const apiUrl = reqBody.apiUrl || 'https://MySightWords.com';

  return new Promise((resolve, reject) => {
    if (!email) {
      logError('no email provided to sendPwReset');
      return reject({ status: 400, error: 'Bad Request' });
    }

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

        nodemailerMailgun.sendMail(mgOptions, (err, info) => {
          if (err || !info) {
            logError(err, 'nodemailer error in sendPwReset');
            return reject({ status: 500, error: 'Error Sending Email' });
          }
          resolve();
        });
      })
      .catch(err => {
        logError(err, 'in sendForgotPwEmail');
        reject(err);
      });
  });
};

export default sendForgotPwEmail;
