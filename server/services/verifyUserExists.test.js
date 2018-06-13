/* eslint-disable */

const chai = require('chai');
const sinon = require('sinon');
const verifyUserExists = require('./verifyUserExists');
const expect = chai.expect;

describe('VerifyUserExists', () => {
  let connection;

  beforeEach('setup mocks', () => {
    global.logError = sinon.stub();
    connection = { query() {} };
  });

  it('should reject if no email provided', () => {
    return verifyUserExists(undefined, connection)
      .then(userId => expect(userId).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject if no connection provided', () => {
    return verifyUserExists('fake@gmail.com')
      .then(userId => expect(userId).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should send 500 on db error', () => {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return verifyUserExists('fake@gmail.com', connection)
      .then(userId => expect(userId).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should send 401 and not log if no user returned', () => {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, []);
    return verifyUserExists('fake@gmail.com', connection)
      .then(userId => expect(userId).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.false;
        expect(err.status).to.equal(401);
      });
  });

  it('should return correct id on success', () => {
    const parent_id = 12;
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, [{ parent_id }]);
    return verifyUserExists('fake@gmail.com', connection).then(userId =>
      expect(userId).to.equal(parent_id)
    );
  });
});
