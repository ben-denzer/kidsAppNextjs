const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const mgConf = require('../keys/.mailgun_conf.js');
const { apiKey, domain } = mgConf;
const mgAuth = {
  auth: { api_key: apiKey, domain } // eslint-disable-line camelcase
};

module.exports = nodemailer.createTransport(mg(mgAuth));
