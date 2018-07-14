const chai = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const createUserToken = require('./createUserToken');
const resetPasswordService = require('./resetPasswordService');
const expect = chai.expect;

describe('Reset Password Service', () => {
  let body;
  let connection;
  let token;

  beforeEach('mocking', async() => {
    global.logError = sinon.stub();
    connection = { query() {} };
    token = await createUserToken(12, jwt);
    body = {
      token,
      password: 'fakePassword',
      p2: 'fakePassword'
    };
  });

  it('should reject 500 for null arguments', () => {
    return resetPasswordService(body)
      .then(success => expect(success).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject 400 if no password', () => {
    body = Object.assign({}, body, { password: undefined, p2: undefined });
    return resetPasswordService(body, connection)
      .then(success => expect(success).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.false;
        expect(err.status).to.equal(400);
      });
  });

  it('should reject 400 if password is too short', () => {
    body = Object.assign({}, body, { password: 'abc', p2: 'abc' });
    return resetPasswordService(body, connection)
      .then(success => expect(success).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.false;
        expect(err.status).to.equal(400);
      });
  });

  it('should reject 400 if passwords dont match', () => {
    body = Object.assign({}, body, { password: 'asdofoeoire' });
    return resetPasswordService(body, connection)
      .then(success => expect(success).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.false;
        expect(err.status).to.equal(400);
      });
  });

  it('should reject on validateJwt error');
  it('should reject on resetPasswordInDb error');
});
