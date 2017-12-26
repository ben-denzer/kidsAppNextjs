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
  });

  it('shoud reject if is incomplete', function() {
    body = Object.assign({}, body, { childId: undefined });
    return addCoinToDB(body, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(err.status).to.equal(400);
      });
  });
});
