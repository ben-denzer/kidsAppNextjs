const expect = require('chai').expect;
const sinon = require('sinon');
const userController = require('./userController');
const mysql = require('mysql');
const dbInfo = require('../keys/.dbKeys');
const connection = mysql.createConnection(dbInfo);
const signup = require('../services/signup').signup;

describe('User Controller', function() {
  let req;
  let res;
  beforeEach('setting up req and res', function() {
    req = {
      login: sinon.stub()
    },
    res = {
      status: sinon.stub(),
      send: sinon.stub()
    }
  });

  describe('Signup BlackBox (server must be running)', function() {
    let body;
    beforeEach('setting up body', function() {
      body = {
        apiUrl: undefined,
        childCount: 1,
        email: 'XXfake@gmail.comXX',
        password: 'fakePassword',
        p2: 'fakePassword'
      };
    });

    it('should add a user', function() {
      this.timeout = 3000;
      connection.query('DELETE FROM parent WHERE email = "XXfake@gmail.comXX"', () => {});
      return signup(body, connection)
        .then(userId => {
          expect(typeof userId).to.equal('number');
          connection.query('DELETE FROM parent WHERE email = "fake@gmail.com"', () => {});
        })
    });

    it('should return 400 and not hit the db if bad args are given', function() {
      this.timeout = 3000;
      const query = sinon.spy(connection, 'query');
      body = Object.assign({}, body, { email: '' });
      return signup(body, connection)
        .then(userId => expect(userId).to.be.false)
        .catch(e => {
          expect(query.called).to.be.false;
          expect(e.status).to.equal(400);
        });
    });
  });
});
