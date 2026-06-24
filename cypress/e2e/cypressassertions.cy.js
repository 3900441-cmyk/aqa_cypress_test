describe('Registration Form Verification', () => {
  const authSettings = {
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    }
  };

  beforeEach(() => {
    cy.visit('https://qauto.forstudy.space/', authSettings);
    cy.contains('Sign In').click();
    cy.get('.modal-footer').contains('Registration').click();
  });

  it('should show error messages for empty required fields', () => {
    cy.get('#signupName').type('1{backspace}').blur();
    cy.get('#signupLastName').type('1{backspace}').blur();
    cy.get('#signupEmail').type('1{backspace}').blur();
    cy.get('#signupPassword').type('1{backspace}').blur();
    cy.get('#signupRepeatPassword').type('1{backspace}').blur();

    cy.contains('Name required').should('be.visible');
    cy.contains('Last name required').should('be.visible');
    cy.contains('Email required').should('be.visible');
    cy.contains('Password required').should('be.visible');
    cy.contains('Re-enter password required').should('be.visible');

    cy.get('.modal-footer .btn-primary').should('be.disabled');
  });

  it('should show error for invalid Name length (less than 2 chars)', () => {
    cy.get('#signupName').type('A').blur();
    cy.contains('Name has to be from 2 to 20 characters long').should('be.visible');
    cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)'); 
  });

  it('should successfully register a new user with unique email', () => {
    const uniqueEmail = `qa_prefix_${Date.now()}@gmail.com`;
    const password = 'SuperSecret123';

    cy.get('#signupName').type('John');
    cy.get('#signupLastName').type('Doe');
    cy.get('#signupEmail').type(uniqueEmail);
    
    cy.get('#signupPassword').type(password, { sensitive: true });
    cy.get('#signupRepeatPassword').type(password, { sensitive: true });

    cy.get('.modal-footer .btn-primary').should('not.be.disabled').click();
    cy.url().should('include', '/panel');
  });

  it('should successfully log in using custom cy.login() command', () => {
    const uniqueEmail = `qa_custom_login_${Date.now()}@gmail.com`;
    const password = 'SuperSecret123';

    cy.get('#signupName').type('Tester');
    cy.get('#signupLastName').type('QA');
    cy.get('#signupEmail').type(uniqueEmail);
    cy.get('#signupPassword').type(password, { sensitive: true });
    cy.get('#signupRepeatPassword').type(password, { sensitive: true });
    cy.get('.modal-footer .btn-primary').click();

    cy.get('#userNavDropdown').click(); 
    cy.get('.dropdown-menu').contains('Logout').click();

    cy.login(uniqueEmail, password);

    cy.url().should('include', '/panel');
  });
});