import chai from 'chai';
import sinon from 'sinon';
import createUserToken from './createUserToken';
const expect = chai.expect;

describe('createUserToken', function() {
  beforeEach('setting up logError', function() {
    global.logError = sinon.stub();
  });

  it('should reject if no userId', function() {
    return createUserToken(undefined)
      .then(token => expect(token).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject if no JWT', function() {
    return createUserToken(12, undefined)
      .then(token => expect(token).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject on jwt error', function() {
    const jwt = {
      sign: sinon.stub().callsArgWithAsync(3, { error: true })
    };

    return createUserToken(12, jwt)
      .then(token => expect(token).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject if no token returned', function() {
    const jwt = {
      sign: sinon.stub().callsArgWithAsync(3, null, null)
    };

    return createUserToken(12, jwt)
      .then(token => expect(token).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should resolve with string', function() {
    const demoToken = 'asdofjpwoiweoif';
    const jwt = {
      sign: sinon.stub().callsArgWithAsync(3, null, demoToken)
    };
    return createUserToken(12, jwt)
      .then(token => { expect(token).to.equal(demoToken) });
  });
});
