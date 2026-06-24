describe('Car and Expenses Hybrid (UI + API) Flow', () => {
  let carId;
  const testCar = {
    brand: 'Audi',
    model: 'TT',
    mileage: 120
  };

  const testExpense = {
    reportedAt: new Date().toISOString().split('T')[0],
    mileage: 150,
    liters: 20,
    totalCost: 50
  };

  beforeEach(() => {
    cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
    cy.url().should('include', '/panel/garage');
  });

  it('should successfully create a car, verify it via API, add expense via API and check via UI', () => {
    cy.intercept('GET', '/api/cars/models*').as('getModels');
    cy.intercept('POST', '/api/cars').as('createCarRequest');
    
    cy.get('.btn-primary').contains('Add car').click();
    cy.get('#addCarBrand').select(testCar.brand);
    cy.wait('@getModels'); 
    cy.get('#addCarModel').should('not.be.disabled').select(testCar.model);
    
    cy.get('#addCarMileage').type(testCar.mileage);
    cy.get('.modal-footer .btn-primary').click();

    cy.wait('@createCarRequest').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
      carId = interception.response.body.data.id;
      expect(carId).to.exist; 
    }).then(() => {
      cy.request('GET', '/api/cars').then((response) => {
        expect(response.status).to.eq(200);
        const carsList = response.body.data;
        const createdCar = carsList.find(car => car.id === carId);
        expect(createdCar).to.exist; 
      });
    }).then(() => {
      cy.request({
        method: 'POST',
        url: '/api/expenses',
        body: {
          carId: carId,
          reportedAt: testExpense.reportedAt,
          mileage: testExpense.mileage,
          liters: testExpense.liters,
          totalCost: testExpense.totalCost
        }
      }).then((expenseResponse) => {
        expect(expenseResponse.status).to.be.oneOf([200, 201]);
      });
    });

    cy.get('a.sidebar_btn').contains('Fuel expenses').click();
    cy.url().should('include', '/panel/expenses');
    cy.reload();
    cy.get('.panel-page', { timeout: 10000 }).should('be.visible');
    cy.contains(`${testCar.brand} ${testCar.model}`).should('be.visible');
    cy.contains(`${testExpense.liters}L`).should('be.visible');
    cy.contains(`${testExpense.totalCost}.00 USD`).should('be.visible');
  });
});