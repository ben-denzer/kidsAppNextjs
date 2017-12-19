import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import { apiKey, domain } from '../keys/.mailgun_conf.js';
const mgAuth = {
  auth: { api_key: apiKey, domain } // eslint-disable-line camelcase
};

export default nodemailer.createTransport(mg(mgAuth));
