describe('Garage and Fuel Expenses Flow', () => {
  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/'); 
    cy.get('.header_signin').click();
    cy.get('#signinEmail').type(Cypress.env('userEmail'));
    cy.get('#signinPassword').type(Cypress.env('userPassword'));
    cy.get('.modal-footer .btn-primary').click();
    cy.url().should('include', '/panel/garage');
  });

  it('should successfully add a car and fuel expense for it', () => {
    cy.get('.btn-primary').contains('Add car').click();
    cy.get('#addCarBrand').select('BMW');
    cy.get('#addCarModel').should('not.be.disabled').select('X5');
    cy.get('#addCarMileage').type('1200');
    cy.get('.modal-footer .btn-primary').click();
    cy.get('.car-heading').should('contain', 'BMW X5');
    cy.get('.car_add-expense').first().click({ force: true });
    cy.get('#addExpenseMileage').type('1500');
    cy.get('#addExpenseLiters').type('50');
    cy.get('#addExpenseTotalCost').type('2500');
    cy.get('.modal-footer .btn-primary').click();
    cy.get('.car-item').first().should('be.visible');
  });
});