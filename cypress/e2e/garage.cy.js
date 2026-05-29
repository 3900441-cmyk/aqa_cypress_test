import GaragePage from '../pageObjects/GaragePage';
import ExpensesPage from '../pageObjects/ExpensesPage';

describe('Garage and Fuel Expenses Flow', () => {
  beforeEach(() => {
    cy.visit('/'); 
    cy.get('.header_signin').click();
    cy.get('#signinEmail').type(Cypress.env('userEmail'));
    cy.get('#signinPassword').type(Cypress.env('userPassword'));
    cy.get('.modal-footer .btn-primary').click();
    cy.url().should('include', '/panel/garage');
  });

  it('should successfully add a car and fuel expense for it', () => {
    const carMileage = 1200;
    const expenseMileage = 1500;

    GaragePage.addCar('BMW', 'X5', carMileage);
    cy.get('.car-heading').should('contain', 'BMW X5');

    GaragePage.clickAddExpenseForFirstCar();
    ExpensesPage.addFuelExpense(expenseMileage, '50', '2500');

    cy.get('.modal-content').should('not.exist');
  });
});