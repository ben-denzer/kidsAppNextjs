/* eslint-disable */
const chai = require('chai');
const signup = require('./signup');
const sinon = require('sinon');
const verifySignupArgs = require('./verifySignupArgs');
const expect = chai.expect;

describe('Signup.js', () => {
  describe('Verify Args', () => {
    let body;
    beforeEach('setup valid arguments', () => {
      body = {
        childCount: '1',
        children: ['child1'],
        email: 'fake.email@gmail.com',
        password: 'fakePassword',
        p2: 'fakePassword'
      };
    });

    it('should resolve with valid arguments', () => {
      return verifySignupArgs(body).then(() => {}).catch(() => {
        throw new Error();
      });
    });

    it('should reject on no children', () => {
      body = Object.assign({}, body, { children: [] });
      return verifySignupArgs(body)
        .then(success => expect(success).to.be.false)
        .catch(e => {
          expect(e.status).to.equal(400);
        });
    });

    it('should reject if no email', () => {
      body = Object.assign({}, body, { email: '' });
      return verifySignupArgs(body)
        .then(success => expect(success).to.be.false)
        .catch(e => {
          expect(e.status).to.equal(400);
        });
    });

    it('should reject if no password and no p2', () => {
      // Testing if password and p2 are !== below so they both have to be the same here
      body = Object.assign({}, body, { password: undefined, p2: undefined });
      return verifySignupArgs(body)
        .then(success => expect(success).to.be.false)
        .catch(e => {
          expect(e.status).to.equal(400);
        });
    });

    it('should reject if email is too short', () => {
      body = Object.assign({}, body, { email: 'a@b.c' });
      return verifySignupArgs(body)
        .then(success => expect(success).to.be.false)
        .catch(e => {
          expect(e.status).to.equal(400);
        });
    });

    it('should reject if email is too long', () => {
      body = Object.assign({}, body, {
        email: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com'
      });

      return verifySignupArgs(body)
        .then(success => expect(success).to.be.false)
        .catch(e => {
          expect(e.status).to.equal(400);
        });
    });

    it('should reject if no dot after @', () => {
      body = Object.assign({}, body, { email: 'ben@gmailcom' });
      return verifySignupArgs(body)
        .then(success => expect(success).to.be.false)
        .catch(e => {
          expect(e.status).to.equal(400);
        });
    });

    it('should reject if nothing between @ and dot', () => {
      body = Object.assign({}, body, { email: 'fake@.com' });
      return verifySignupArgs(body)
        .then(success => expect(success).to.be.false)
        .catch(e => {
          expect(e.status).to.equal(400);
        });
    });

    it('should reject if 2 @ symbols', () => {
      body = Object.assign({}, body, { email: 'fake@email@gmail.com' });
      return verifySignupArgs(body)
        .then(success => expect(success).to.be.false)
        .catch(e => {
          expect(e.status).to.equal(400);
        });
    });

    it('should reject if less than 2 characters after last dot', () => {
      body = Object.assign({}, body, { email: 'fake@gmail.c' });
      return verifySignupArgs(body)
        .then(success => expect(success).to.be.false)
        .catch(e => {
          expect(e.status).to.equal(400);
        });
    });

    it('should reject short passwords', () => {
      body = Object.assign({}, body, { password: 'passwo', p2: 'passwo' });
      return verifySignupArgs(body)
        .then(success => expect(success).to.be.false)
        .catch(e => {
          expect(e.status).to.equal(400);
        });
    });

    it("should reject if passwords don't match", () => {
      body = Object.assign({}, body, { password: 'abcdefghij' });
      return verifySignupArgs(body)
        .then(success => expect(success).to.be.false)
        .catch(e => {
          expect(e.status).to.equal(400);
        });
    });
  });
});
