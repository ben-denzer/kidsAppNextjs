const chai = require('chai');
const sinon = require('sinon');
const changePasswordInDb = require('./changePasswordInDb');
const expect = chai.expect;

describe('Change Password In DB', () => {
  let connection;
  let id;
  let newPassword;

  beforeEach('setup', () => {
    connection = { query() {} };
    id = 12;
    newPassword = 'abcdefg';
    global.logError = sinon.stub();
  });

  it('should reject if args are missing', () => {
    newPassword = undefined;
    return changePasswordInDb(id, newPassword, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject on db error', () => {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return changePasswordInDb(id, newPassword, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(/db error/i.test(logError.firstCall.args[1])).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should resolve on success', () => {
    sinon
      .stub(connection, 'query')
      .callsArgWithAsync(2, null, { success: true });
    return changePasswordInDb(id, newPassword, connection).then(
      ok => expect(Boolean(ok)).to.be.true
    );
  });
});
