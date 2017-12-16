import chai from 'chai';
import sinon from 'sinon';
import resetPasswordInDb from './resetPasswordInDb';
const expect = chai.expect;

describe('Reset Password in DB', function() {
  let email;
  let password;
  let connection;
  beforeEach('mocking', function() {
    global.logError = sinon.stub();
    email = 'fake@gmail.com';
    password = 'fakePassword';
    connection = { query() {} };
  });

  it('should reject if it is missing any args', function() {
    return resetPasswordInDb(email, password)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject on db error', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: 'true' });
    return resetPasswordInDb(email, password, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject 401 on user not found', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, { affectedRows: 0 });
    return resetPasswordInDb(email, password, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(401);
      });
  });

  it('should resolve if db returns affected row', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, { affectedRows: 1 });
    return resetPasswordInDb(email, password, connection)
      .then(ok => expect(Boolean(ok)).to.be.true)
  });
});
