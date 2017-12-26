import chai from 'chai';
import sinon from 'sinon';
import addCoinToDB from './addCoinToDB';
const expect = chai.expect;

describe('Add Coin To DB', function() {
  let body;
  let connection;

  beforeEach('mocking', function() {
    global.logError = sinon.stub();
    body = { childId: 12, coins: 12 };
    connection = { query() {} };
    global.logError = sinon.stub();
  });

  it('shoud reject if is incomplete', function() {
    const query = sinon.stub(connection, 'query');
    body = Object.assign({}, body, { childId: undefined });
    return addCoinToDB(body, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(400);
        expect(query.called).to.be.false;
      });
  });

  it('should reject 500 if no connection', function() {
    return addCoinToDB(body)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject on db error', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return addCoinToDB(body, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should update coins', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, { success: true });
    return addCoinToDB(body, connection)
      .then(ok => expect(Boolean(ok)).to.be.true);
  });
});
