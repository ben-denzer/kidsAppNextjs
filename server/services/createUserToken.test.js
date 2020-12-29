const chai = require('chai');
const sinon = require('sinon');
const createUserToken = require('./createUserToken');
const expect = chai.expect;

describe('createUserToken', () => {
  beforeEach('setting up logError', () => {
    global.logError = sinon.stub();
  });

  it('should reject if no userId', () => {
    return createUserToken(undefined)
      .then(token => expect(token).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject if no JWT', () => {
    return createUserToken(12, undefined)
      .then(token => expect(token).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject on jwt error', () => {
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

  it('should reject if no token returned', () => {
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

  it('should resolve with string', () => {
    const demoToken = 'asdofjpwoiweoif';
    const jwt = {
      sign: sinon.stub().callsArgWithAsync(3, null, demoToken)
    };
    return createUserToken(12, jwt).then(token => {
      expect(token).to.equal(demoToken);
    });
  });
});
