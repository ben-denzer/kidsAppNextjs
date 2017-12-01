const expect = require('chai').expect;
const sinon = require('sinon');
const unsubscribeUserEmail = require('./unsubscribeUserEmail');

describe('UnsubscribeUserEmail', function() {
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

    return unsubscribeUserEmail(undefined, connection)
      .then(() => { throw new Error() })
      .catch(() => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.equal('no email provided to unsubscribeUserEmail');
      });
  });

  it('should reject if no connection provided', function() {
    return unsubscribeUserEmail(data)
      .then(() => { throw new Error('') })
      .catch(() => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.equal('Connection is undefined or null in unsubscribeUserEmail');
      });
  });

  it('should resolve if user is in db', function() {
    const connection = {
      query: sinon.stub().callsArgWithAsync(2, null, true)
    };

    return unsubscribeUserEmail(data, connection)
      .then(() => {
        expect(logError.notCalled).to.be.true;
      }).catch(e => { throw new Error() });
  });
});
