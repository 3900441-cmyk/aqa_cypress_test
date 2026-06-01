class ExpensesPage {
  get mileageInput() { return cy.get('#addExpenseMileage'); }
  get litersInput() { return cy.get('#addExpenseLiters'); }
  get totalCostInput() { return cy.get('#addExpenseTotalCost'); }
  get submitExpenseButton() { return cy.get('.modal-footer .btn-primary'); }

  addFuelExpense(mileage, liters, cost) {

    this.mileageInput.clear().type(mileage);
    this.litersInput.type(liters);
    this.totalCostInput.type(cost);
    this.submitExpenseButton.click();
  }
}
export default new ExpensesPage();