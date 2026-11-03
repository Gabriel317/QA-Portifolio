describe('Login', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com')
    })

    it('entra com usuário e senha', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.contains('Products').should('be.visible')
    })

       it('mostra o erro para usuário bloqueado', () => {
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'locked out')
    })
})