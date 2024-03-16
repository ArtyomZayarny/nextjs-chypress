describe("Form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });

  it("Test subscribe form", () => {
    const inputId = "subscribe-input";
    cy.contains(/testing form/i);
    //Testing happy path
    //Create  alias
    cy.getDataTest("subscribe-form").find("input").as(inputId);
    cy.get(`@${inputId}`).type("timaz.dev@gmail.com");
    cy.contains(/Successfully subbed: timaz.dev@gmail.com!/i).should(
      "not.exist"
    );
    cy.getDataTest("subscribe-button").click();
    cy.contains(/Successfully subbed: timaz.dev@gmail.com!/i).should("exist");
    cy.wait(3000);
    cy.contains(/Successfully subbed: timaz.dev@gmail.com!/i).should(
      "not.exist"
    );

    //Testing unhappy path Wrong email
    cy.get(`@${inputId}`).type("timaz.dev@mail.io");
    cy.contains(/invalid email: timaz.dev@mail.io!/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/invalid email: timaz.dev@mail.io!/i).should("exist");
    cy.wait(3000);
    cy.contains(/invalid email: timaz.dev@mail.io!/i).should("not.exist");

    //Submit empty form
    cy.contains(/fail!/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/fail!/i).should("exist");
  });
});
