describe('Header and Footer Elements', () => {
  const authSettings = {
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    }
  };

  it('Header and Footer elements', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('https://qauto.forstudy.space/', authSettings);

    cy.get('header').within(() => {
      cy.get('.header_logo').should('be.visible');
      cy.contains('Home').should('be.visible');
      cy.contains('About').should('be.visible');
      cy.contains('Contacts').should('be.visible');
      cy.contains('Guest log in').should('be.visible');
      cy.contains('Sign In').should('be.visible');
    });
    cy.scrollTo('bottom');
    cy.contains('Contacts').should('be.visible');

    cy.get('a[href*="facebook.com"]').should('exist');
    cy.get('a[href*="t.me"]').should('exist');
    cy.get('a[href*="youtube.com"]').should('exist');
    cy.get('a[href*="instagram.com"]').should('exist');
    cy.get('a[href*="linkedin.com"]').should('exist');

    cy.contains('ithillel.ua').should('be.visible');
    cy.contains('support@ithillel.ua').should('be.visible');
    });
});