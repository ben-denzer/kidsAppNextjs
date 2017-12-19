import chai from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import createUserToken from './createUserToken';
import resetPasswordService from './resetPasswordService';
const expect = chai.expect;

describe('Reset Password Service', function() {
  let body;
  let connection;
  let token;

  beforeEach('mocking', async function() {
    global.logError = sinon.stub();
    connection = { query() {} };
    token = await createUserToken(12, jwt);
    body = {
      token,
      password: 'fakePassword',
      p2: 'fakePassword'
    };
  });

  it('should reject 500 for null arguments', function() {
    return resetPasswordService(body)
      .then(success => expect(success).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject 400 if no token', function() {
    body = Object.assign({}, body, { token: undefined });
    return resetPasswordService(body, connection)
      .then(success => expect(success).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.false;
        expect(err.status).to.equal(400);
      });
  });

  it('should reject 400 if no password', function() {
    body = Object.assign({}, body, { password: undefined, p2: undefined });
    return resetPasswordService(body, connection)
      .then(success => expect(success).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.false;
        expect(err.status).to.equal(400);
      });
  });

  it('should reject 400 if password is too short', function() {
    body = Object.assign({}, body, { password: 'abc', p2: 'abc' });
    return resetPasswordService(body, connection)
      .then(success => expect(success).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.false;
        expect(err.status).to.equal(400);
      });
  });

  it('should reject 400 if passwords dont match', function() {
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
