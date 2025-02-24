describe('QueryBug Playground', () => {
  it('should load the playground page', () => {
    cy.visit('/');
    cy.contains('QueryBug Playground');
  });

  it('should format JSON input', () => {
    cy.visit('/');
    cy.get('#jsonInput').type('{"name":"John Doe"}', { parseSpecialCharSequences: false });
    cy.get('#format-json-button').click();
    cy.get('#jsonInput').should('have.value', '{\n  "name": "John Doe"\n}');
  });

  it('should submit a query and display the output', () => {
    cy.visit('/');
    cy.get('#jqFilter').type('.name');
    cy.get('#jsonInput').type('{"name":"John Doe"}', { parseSpecialCharSequences: false });
    cy.get('form').submit();
    cy.get('#output').should('contain', 'John Doe');
  });
});
