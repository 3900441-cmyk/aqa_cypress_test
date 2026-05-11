describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.contains("get").click();
    cy.get("#inputEmail").type("test@gameil.com");
    cy.get("#inputPassword").type("testpassword");
    cy.get('[data-cy="submit"]').click();
  })
})