const chai = require('chai');
const sinon = require('sinon');
const getWordId = require('./getWordId');
const expect = chai.expect;

describe('Get Word ID, add to words table if needed', () => {
  let connection;

  beforeEach('setup', () => {
    connection = { query() {} };
    global.logError = sinon.stub();
  });

  it('should reject 500 on no word || connection', () => {
    return getWordId('test').then(ok => expect(ok).to.be.false).catch(err => {
      expect(logError.calledOnce).to.be.true;
      expect(err.status).to.equal(500);
    });
  });

  it('should reject if db error in SELECT', () => {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return getWordId('test', connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
        expect(/SELECT/i.test(logError.firstCall.args[1])).to.be.true;
      });
  });

  if (
    'should resolve with id if word is found', function() {
      const wordId = 12;
      sinon
        .stub(connection, 'query')
        .callsArgWithAsync(2, null, [ { word_id: 12 } ]);
      return getWordId('test', connection).then(id =>
        expect(id).to.equal(wordId)
      );
    }
  );
  it('should reject if INSERT fails');
  it('should resolve with the insertId');
});
