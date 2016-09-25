describe('Log In', function () {
  beforeEach(function () {
    browser.url('http://localhost:3000');
    server.call('fixtures/resetDatabase');
    server.call('fixtures/createUser', {
      name: 'Test',
      email: 'test@example.com',
      password: 'testpass',
    });
  });
  it('should allow us to login @watch', function () {
    browser.url('http://localhost:3000/login')
      .setValue('[name="email"]', 'test@example.com')
      .setValue('[name="password"]', 'testpass')
      .submitForm('form');

    browser.waitForExist('.home-page');
    expect(browser.getUrl()).to.equal('http://localhost:3000/');
  });
});