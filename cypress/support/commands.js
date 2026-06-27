Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }
  return originalFn(element, text, options);
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://qauto.forstudy.space/');
  
  cy.get('body').then(($body) => {
    if ($body.find('.header_signin').length > 0) {
      cy.get('.header_signin').click();
      cy.get('#signinEmail').type(email);
      cy.get('#signinPassword').type(password, { sensitive: true });
      cy.get('.modal-footer .btn-primary').click();
      
      cy.url().should('include', '/panel');
    } else {
      cy.log('Вже залогінені, пропускаємо крок логіну');
    }
  });
});

Cypress.Commands.add('createCarViaApi', (carData) => {
  return cy.request({
    method: 'POST',
    url: '/api/cars',
    body: carData,
  }).then((response) => {
    expect(response.status).to.eq(201);
    return response.body.data;
  });
});

Cypress.Commands.add('createExpenseViaApi', (expenseData) => {
  return cy.request({
    method: 'POST',
    url: '/api/expenses',
    body: expenseData,
  }).then((response) => {
    expect(response.status).to.eq(201);
    return response.body.data;
  });
});