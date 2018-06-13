const chai = require('chai');
const sinon = require('sinon');
const resetPasswordInDb = require('./resetPasswordInDb');
const expect = chai.expect;

describe('Reset Password in DB', () => {
  let email;
  let password;
  let connection;
  beforeEach('mocking', () => {
    global.logError = sinon.stub();
    email = 'fake@gmail.com';
    password = 'fakePassword';
    connection = { query() {} };
  });

  it('should reject if it is missing any args', () => {
    return resetPasswordInDb(email, password)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject on db error', () => {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: 'true' });
    return resetPasswordInDb(email, password, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject 401 on user not found', () => {
    sinon
      .stub(connection, 'query')
      .callsArgWithAsync(2, null, { affectedRows: 0 });
    return resetPasswordInDb(email, password, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(401);
      });
  });

  it('should resolve if db returns affected row', () => {
    sinon
      .stub(connection, 'query')
      .callsArgWithAsync(2, null, { affectedRows: 1 });
    return resetPasswordInDb(email, password, connection).then(
      ok => expect(Boolean(ok)).to.be.true
    );
  });
});
