const chai = require('chai');
const sinon = require('sinon');
const hashPassword = require('./hashPassword');
const expect = chai.expect;

describe('Hash Password', () => {
  beforeEach('set up logError mock', () => {
    global.logError = sinon.spy();
  });

  it('should resolve if given correct args', () => {
    const bcrypt = {
      hash: sinon.stub().callsArgWithAsync(2, null, 'fakeHash-fakeHash')
    };

    return hashPassword('password', bcrypt).then(result =>
      expect(result).to.equal('fakeHash-fakeHash')
    );
  });

  it('should reject if no password', () => {
    const bcrypt = {
      hash: sinon.stub().callsArgWithAsync(2, null, 'fakeHash-fakeHash')
    };

    return hashPassword(undefined, bcrypt)
      .then(hash => {
        throw new Error();
      })
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.equal(
          'no password sent to hashPassword'
        );
        expect(err.status).to.equal(500);
      });
  });

  it('should reject if password is too short', () => {
    const bcrypt = {
      hash: sinon.stub().callsArgWithAsync(2, null, 'fakeHash-fakeHash')
    };

    return hashPassword('asdf', bcrypt)
      .then(hash => {
        throw new Error();
      })
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.equal(
          'invalid password sent to hashPassword'
        );
        expect(err.status).to.equal(500);
      });
  });

  it('should reject if no bcrypt', () => {
    return hashPassword('fakePassword')
      .then(hash => {
        throw new Error();
      })
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.equal(
          'bcrypt not sent to hashPassword'
        );
        expect(err.status).to.equal(500);
      });
  });

  it('should reject on bcrypt error', () => {
    const bcrypt = {
      hash: sinon.stub().callsArgWithAsync(2, { error: true })
    };

    return hashPassword('password', bcrypt)
      .then(result => {
        throw new Error('shouldnt resolve here');
      })
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[1]).to.equal('bcrypt hash error');
        expect(err.status).to.equal(500);
      });
  });

  it('should reject if no hash returned', () => {
    const bcrypt = {
      hash: sinon.stub().callsArgWithAsync(2, null, null)
    };

    return hashPassword('password', bcrypt)
      .then(result => {
        throw new Error('shouldnt resolve here');
      })
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.equal('no hash returned');
        expect(err.status).to.equal(500);
      });
  });
});
