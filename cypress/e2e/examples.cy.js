describe("various examples", () => {
  beforeEach(() => cy.visit("/examples"));

  it("multi-page testing", () => {
    cy.getDataTest("nav-why-cypress").click();
    cy.location("pathname").should("equal", "/");

    cy.getDataTest("nav-overview").click();
    cy.location("pathname").should("equal", "/overview");

    cy.getDataTest("nav-fundamentals").click();
    cy.location("pathname").should("equal", "/fundamentals");
  });

  it("Intercepts", () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      fixture: "example.json",
    });

    cy.getDataTest("post-button").click();
  });

  it.only("Grudges test", () => {
    cy.contains(/add some grudges/i);
    //Grudgle list is empty
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });

    //Check if clear button doesn't exist
    cy.getDataTest("clear-button").should("not.exist");

    //Check title
    //"Grudges" : "Add Some Grudges";
    cy.getDataTest("grudge-list-title").should("have.text", "Add Some Grudges");

    cy.getDataTest("grudge-input").within(() => {
      cy.get("input").type("some grudge");
    });

    cy.getDataTest("add-grudge-button").click();

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });

    //Title is changed
    cy.getDataTest("grudge-list-title").should("have.text", "Grudges");

    cy.getDataTest("grudge-input").within(() => {
      cy.get("input").type("number 2");
    });

    cy.getDataTest("add-grudge-button").click();

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 2);
      cy.get("li").its(0).should("contain.text", "some grudge");
    });

    //Remove grudge item
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li")
        .its(0)
        .within(() => {
          cy.get("button").click();
        });
    });

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });

    //Clear all grudges

    cy.getDataTest("clear-button").click();

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });
  });
});
