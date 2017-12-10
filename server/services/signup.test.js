import chai from 'chai';
import signup, { verifyArgs } from './signup';
import sinon from 'sinon';
const expect = chai.expect;

describe('Signup.js', function() {
  describe('Verify Args', function() {
    let body;
    beforeEach('setup valid arguments', function() {
      body = {
        childCount: '1',
        children: ['child1'],
        email: 'fake.email@gmail.com',
        password: 'fakePassword',
        p2: 'fakePassword'
      }
    });

    it('should resolve with valid arguments', function() {
      return verifyArgs(body)
        .then(() => {})
        .catch(() => { throw new Error() });
    });

    it('should reject if no childCount', function() {
      body = Object.assign({}, body, { childCount: undefined });
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject if children.length and childCount dont match', function() {
      body = Object.assign({}, body, { children: ['child1', 'child2'] });
      return verifyArgs(body)
      .then(success => expect(success).to.be.false)
      .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject on no children', function() {
      body = Object.assign({}, body, { children: [] });
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    })

    it('should reject if no email', function() {
      body = Object.assign({}, body, { email: '' });
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject if no password and no p2', function() {
      // Testing if password and p2 are !== below so they both have to be the same here
      body = Object.assign(
        {},
        body,
        { password: undefined, p2: undefined }
      );
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject if email is too short', function() {
      body = Object.assign({}, body, { email: 'a@b.c' });
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject if email is too long', function() {
      body = Object.assign(
        {},
        body,
        { email: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com'
        }
      );

      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject if no dot after @', function() {
      body = Object.assign({}, body, { email: 'ben@gmailcom' });
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject if nothing between @ and dot', function() {
      body = Object.assign({}, body, { email: 'fake@.com' });
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject if 2 @ symbols', function() {
      body = Object.assign({}, body, { email: 'fake@email@gmail.com' });
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject if less than 2 characters after last dot', function() {
      body = Object.assign({}, body, { email: 'fake@gmail.c' });
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject short passwords', function() {
      body = Object.assign(
        {},
        body,
        { password: 'passwo', p2: 'passwo' }
      );
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject if passwords don\'t match', function() {
      body = Object.assign({}, body, { password: 'abcdefghij' });
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject strings in childCount', function() {
      body = Object.assign({}, body, { childCount: 'abc' });
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });

    it('should reject if childCount < 1', function() {
      body = Object.assign({}, body, { childCount: -1 });
      return verifyArgs(body)
        .then(success => expect(success).to.be.false)
        .catch((e) => { expect(e.status).to.equal(400) });
    });
  });
});
