import chai from 'chai';
import sinon from 'sinon';
import checkForDuplicateEmail from './checkForDuplicateEmail';
const expect = chai.expect;

describe('Check For Duplicate Email', function() {
  beforeEach('mock connection and logError', function() {
    global.logError = sinon.stub();
  });

  it('should reject if no email', function() {
    return checkForDuplicateEmail()
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.equal('no email provided to checkEmail');
        expect(e.status).to.equal(500);
      })
  });

  it('should reject if no connection', function() {
    return checkForDuplicateEmail('fakeEmail@gmail.com')
      .then(success => expect(success).to.not.be.true)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.equal('no connection provided to checkEmail');
        expect(e.status).to.equal(500);
      })
  });

  it('should reject on db error', function() {
    const connection = {
      query: sinon.stub().callsArgWithAsync(2, { error: true })
    };

    return checkForDuplicateEmail('fake@gmail.com', connection)
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[1]).to.include('db error');
        expect(e.status).to.equal(500);
      });
  });

  it('should reject with 200 if email is in use', function() {
    const connection = {
      query: sinon.stub().callsArgWithAsync(2, null, [{ parent_id: 123 }])
    };

    return checkForDuplicateEmail('fake@gmail.com', connection)
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.called).to.be.false;
        expect(e.status).to.equal(401);
        expect(e.error).to.equal('Email Is Already In Use');
      });
  });

  it('should resolve if email is not in use', function() {
    const connection = {
      query: sinon.stub().callsArgWithAsync(2, null, [])
    };

    return checkForDuplicateEmail('fake@gmail.com', connection)
      .then(success => expect(success).to.equal('ok'));
  });
});
