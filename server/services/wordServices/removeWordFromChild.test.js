const chai = require('chai');
const sinon = require('sinon');
const removeWordFromChild = require('./removeWordFromChild');
const createUserToken = require('../createUserToken');
const jwt = require('jsonwebtoken');
const expect = chai.expect;
let token;
let expiredToken;
createUserToken(15, jwt).then(demoToken => token = demoToken);
createUserToken(15, jwt, { expiresIn: '0s' }).then(
  badToken => expiredToken = badToken
);

describe('Remove Word From Child', () => {
  let connection;
  let body;
  let jwt;
  beforeEach('setup', () => {
    body = {
      token,
      childId: 23,
      wordId: 21
    };
    connection = { query() {} };
    global.logError = sinon.stub();
    jwt = {};
  });

  it('should reject 400 if body is missing args', () => {
    body = Object.assign({}, body, { token: null });
    return removeWordFromChild(body, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(400);
      });
  });

  it('should reject 500 if missing connection', () => {
    return removeWordFromChild(body)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject 401 if token is expired', () => {
    body = Object.assign({}, body, { token: expiredToken });
    return removeWordFromChild(body, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(401);
      });
  });

  it('should reject 500 if token is not valid', () => {
    body = Object.assign({}, body, { token: 'sdsdfljdsofiewfowoej' });
    return removeWordFromChild(body, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {

        // logError called in validateJwt and here too
        expect(logError.calledTwice).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject 500 if db call fails', () => {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { err: true });
    return removeWordFromChild(body, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce, 'logError Called').to.be.true;
        expect(/db error/i.test(logError.firstCall.args[1]), 'logError message')
          .to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should resolve if all is well', () => {
    sinon
      .stub(connection, 'query')
      .callsArgWithAsync(2, null, { success: true });
    return removeWordFromChild(body, connection).then(
      ok => expect(ok.success).to.be.true
    );
  });
});
