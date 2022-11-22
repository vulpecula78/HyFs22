describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
        name: 'Tero Testi',
        username: 'Testaaja',
        password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    cy.contains('username:')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Testaaja')
      cy.get('#password').type('salasana')
      cy.get('#login').click()

      cy.contains('Tero Testi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#username').type('Tetsaaja')
      cy.get('#password').type('kalasana')
      cy.get('#login').click()

      cy.get('.error').contains('wrong')
      cy.contains('Log in to application')
    })
  })
})
