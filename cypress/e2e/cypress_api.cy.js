describe('Car and Expenses Hybrid (UI + API) Flow', () => {
  let carId;
  const testCar = {
    brand: 'Fiat',
    model: 'Palio',
    mileage: 100
  };

  const testExpense = {
    reportedAt: new Date().toISOString().split('T')[0],
    mileage: 6000,
    liters: 20,
    totalCost: 50
  };

  beforeEach(() => {
    cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
    cy.url().should('include', '/panel/garage');
  });

  it('should successfully create a car, verify it via API, add expense via API and check via UI', () => {
    cy.request({
      method: 'GET',
      url: '/api/cars'
    }).then((res) => {
      res.body.data.forEach(car => {
        cy.request('DELETE', `/api/cars/${car.id}`);
      });
    });

    cy.intercept('GET', '/api/cars/models*').as('getModels');
    cy.intercept('POST', '/api/cars').as('createCarRequest');
    
    cy.get('.btn-primary').contains('Add car').click();
    cy.get('#addCarBrand').select(testCar.brand);
    
    cy.wait('@getModels'); 
    cy.get('#addCarModel').should('not.be.disabled').select(testCar.model);
    
    cy.get('#addCarMileage').type(testCar.mileage.toString());
    cy.get('.modal-footer .btn-primary').click();

    cy.wait('@createCarRequest').then((interception) => {
      if (interception.response.statusCode !== 200 && interception.response.statusCode !== 201) {
        cy.log('ПОМИЛКА API: ' + JSON.stringify(interception.response.body));
        throw new Error('API failed with status ' + interception.response.statusCode);
      }
      carId = interception.response.body.data.id;
      expect(carId).to.exist; 
    }).then(() => {
      return cy.request('GET', '/api/cars');
    }).then((response) => {
      expect(response.status).to.eq(200);
      const createdCar = response.body.data.find(car => car.id === carId);
      expect(createdCar).to.exist; 
    }).then(() => {
      return cy.request({
        method: 'POST',
        url: '/api/expenses',
        body: {
          carId: carId,
          reportedAt: testExpense.reportedAt,
          mileage: testExpense.mileage,
          liters: testExpense.liters,
          totalCost: testExpense.totalCost
        }
      });
    }).then((expenseResponse) => {
      expect(expenseResponse.status).to.be.oneOf([200, 201]);
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