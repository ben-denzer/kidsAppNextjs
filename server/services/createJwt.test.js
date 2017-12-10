import chai from 'chai';
import sinon from 'sinon';
import createJwt from './createJwt';
const expect = chai.expect;

describe('createJwt', function() {
  beforeEach('setting up logError', function() {
    global.logError = sinon.stub();
  });

  it('should reject if no userId', function() {
    return createJwt(undefined)
      .then(token => expect(token).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject if no JWT', function() {
    return createJwt(12, undefined)
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

    return createJwt(12, jwt)
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

    return createJwt(12, jwt)
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
    return createJwt(12, jwt)
      .then(token => { expect(token).to.equal(demoToken) });
  });
});
