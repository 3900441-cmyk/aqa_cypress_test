describe('Car and Expenses Hybrid (UI + API) Flow', () => {
  let carId;
  const testCar = {
    brand: 'Audi',
    model: 'TT',
    mileage: 120
  };

  const testExpense = {
    reportedAt: new Date().toISOString().split('T')[0], // Поточна дата у форматі YYYY-MM-DD
    mileage: 150,
    liters: 20,
    totalCost: 50
  };

  beforeEach(() => {
    cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
    cy.url().should('include', '/panel/garage');
  });

  it('should successfully create a car, verify it via API, add expense via API and check via UI', () => {
    cy.intercept('POST', '/api/cars').as('createCarRequest');
    cy.get('.btn-primary').contains('Add car').click();
    cy.get('#addCarBrand').select(testCar.brand);
    cy.get('#addCarModel').select(testCar.model);
    cy.get('#addCarMileage').type(testCar.mileage);
    cy.get('.modal-footer .btn-primary').click();

    cy.wait('@createCarRequest').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
      carId = interception.response.body.data.id;
      expect(carId).to.exist;
      cy.log(`Created Car ID: ${carId}`);
    }).then(() => {
      cy.request('GET', '/api/cars').then((response) => {
        expect(response.status).to.eq(200);
        const carsList = response.body.data;
        const createdCar = carsList.find(car => car.id === carId);
        expect(createdCar).to.exist;
        expect(createdCar.brand).to.eq(testCar.brand);
        expect(createdCar.model).to.eq(testCar.model);
      });
    }).then(() => {
      cy.createExpenseViaApi(carId, testExpense).then((expenseResponse) => {
        expect(expenseResponse.status).to.be.oneOf([200, 201]);
        expect(expenseResponse.body.data).to.have.property('id');
        expect(expenseResponse.body.data.carId).to.eq(carId);
        expect(expenseResponse.body.data.liters).to.eq(testExpense.liters);
        expect(expenseResponse.body.data.totalCost).to.eq(testExpense.totalCost);
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