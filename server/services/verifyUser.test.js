const expect = require('chai').expect;
const sinon = require('sinon');
const verifyUser = require('./verifyUser');

describe('VerifyUser', function() {
  let data;

  beforeEach('setting up email and logError', function() {
    data = {
      email: 'fakeEmail@gmail.com'
    };

    global.logError = sinon.stub();
  });

  it('should reject if no email provided', function() {
    const connection = {
      query: sinon.stub().callsArgWithAsync(2, null, true)
    };

    return verifyUser({}, connection)
      .then(() => { throw new Error() })
      .catch(() => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.equal('no data object || email provided to verifyUser');
      });
  });

  it('should reject if no connection provided', function() {
    return verifyUser(data)
      .then(() => { throw new Error('') })
      .catch(() => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.equal('Connection is undefined or null in verifyUser');
      });
  });

  it('should reject if success is not called', function() {
    const connection = {
      query: sinon.stub().callsArgWithAsync(2, null, null)
    };

    return verifyUser(data, connection)
      .then(() => { throw new Error() })
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.equal('no success returned from db in verifyUser');
      });
  });

  it('should resolve if user is in db', function() {
    const connection = {
      query: sinon.stub().callsArgWithAsync(2, null, true)
    };

    return verifyUser(data, connection)
      .then(() => {
        expect(logError.notCalled).to.be.true;
      }).catch(e => { throw new Error() });
  });
});
