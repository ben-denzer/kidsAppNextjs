import chai from 'chai';
import sinon from 'sinon';
import getAllWordsForChild from './getAllWordsForChild';
const expect = chai.expect;

describe('Get all words for child', function() {
  it('NEEDS TESTS AND MAYBE A REFACTOR');
  // let connection;
  // let id;

  // beforeEach('setup', function() {
  //   connection = { query() {} };
  //   global.logError = sinon.stub();
  //   id = 12;
  // });

  // it('should reject if no id', function() {
  //   return getAllWordsForChild(undefined, connection)
  //     .then(words => expect(words).to.be.false)
  //     .catch(err => {
  //       expect(logError.calledOnce).to.be.true;
  //       expect(err.status).to.equal(400);
  //     });
  // });

  // it('should reject if no connection', function() {
  //   return getAllWordsForChild(id)
  //     .then(words => expect(words).to.be.false)
  //     .catch(err => {
  //       expect(logError.calledOnce).to.be.true;
  //       expect(err.status).to.equal(500);
  //     });
  // });

  // it('should reject on db error', function() {
  //   sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
  //   return getAllWordsForChild(id, connection)
  //     .then(words => expect(words).to.be.false)
  //     .catch(err => {
  //       expect(logError.calledOnce).to.be.true;
  //       expect(/db error/i.test(logError.firstCall.args[1])).to.be.true;
  //       expect(err.status).to.equal(500);
  //     })
  // });

  // it('should resolve with words', function() {
  //   sinon.stub(connection, 'query').callsArgWithAsync(2, null, [{ word_id: 0, word_text: 'test' }]);
  //   return getAllWordsForChild(id, connection)
  //     .then(words => expect(Boolean(words.length)).to.be.true)
  // });
});
