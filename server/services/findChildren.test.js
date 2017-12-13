import chai from 'chai';
import sinon from 'sinon';
import findChildren from './findChildren';
const expect = chai.expect;

describe('Find Children', function() {
  let connection;
  beforeEach('setting up logError', function() {
    connection = { query() {} };
    global.logError = sinon.stub();
  });

  it('should reject for null arguments', function() {
    return findChildren(23)
      .then(data => expect(data).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject on db error', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return findChildren(23, connection)
      .then(data => expect(data).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should resolve with userId and children array', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, [{ name: 'Ben', coins: 1000 }]);
    return findChildren(23, connection)
      .then(data => {
        expect(typeof data.userId).to.equal('number');
        expect(Array.isArray(data.children)).to.be.true;
      });
  });
});
