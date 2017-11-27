const mailchimp = require('../config/.mailchimpTokens');
const request = require('request');
const md5 = require('md5');

function subscribeUserToList(email, connection) {
  if (!email) {
    logError('no email provided to subscribeUserToList');
    return;
  }

  const userMd5 = md5(email.toLowerCase());
  const checkIfExistsUrl = `${mailchimp.baseUrl}lists/${mailchimp.listId}/members/${userMd5}`;
  const checkIfExistsOptions = {
    method: 'GET',
    uri: checkIfExistsUrl,
    auth: {
      user: 'ott',
      pass: mailchimp.apiKey
    }
  };

  const subscribeUserUrl = `${mailchimp.baseUrl}lists/${mailchimp.listId}/members/`;
  const subscribeUserOptions = {
    method: 'POST',
    uri: subscribeUserUrl,
    auth: {
      user: 'ott',
      pass: mailchimp.apiKey
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed'
    })
  };

  request(checkIfExistsOptions, (err, res, body) => {
    if (err) {
      logError(err, 'in checkIfExists - subscribeUserToList');
      return;
    }
    if (Number(JSON.parse(body).status) === 404) { // 404 means not subscribed
      request(subscribeUserOptions, (err, res, body) => {
        if (err || res.statusCode >= 400) {
          logError({ err, res, body }, `error saving ${email} in subscribeUserToList`);
        }
        return;
      });
    } else {
      console.log(JSON.parse(body).status);
    }
  });

  return;
}

module.exports = subscribeUserToList;
