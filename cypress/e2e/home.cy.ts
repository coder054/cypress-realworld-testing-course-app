export const getNodeText = (node: any): any => {
  try {
    if (["string", "number"].includes(typeof node)) return node
    if (node instanceof Array) return node.map(getNodeText).join("")
    if (typeof node === "object" && node)
      return getNodeText(node.props.children)
  } catch (error) {
    if (!!error) {
      return ""
    }
  }
}

describe("home page", () => {
  it("the h1 contains the correct text", () => {
    cy.visit("http://localhost:3000")
    cy.get("[data-test='hero-heading']").contains(
      "Testing Next.js Applications with Cypress"
    )
  })

  it.only("the features on the homepage are correct", () => {
    cy.visit("http://localhost:3000")
    const dt = cy.get("dt").eq(0)
    // const text = getNodeText(dt)
    const b = dt.should((data) => {
      const arr = Array.from(data)
      const a = arr.map((o) => o.innerText)
      console.log("aaa data", a)
      return a
    })
    const text = dt
    console.log("aaa b", b)
    console.log("aaa text", text)
    // cy.get("dt").eq(0).contains("abc")
    const features = cy.getByData("feature-name")
    const texts = features
      .invoke("text")
      .should("eq", "4 Courses25+ LessonsFree and Open Source")
    console.log("aaa texts", texts)
    cy.getByData("child").should("have.length", 7)
    cy.getByData("parent")
      .first()
      .within(() => {
        cy.getByData("child").should("have.length", 3)
      })

    cy.getByData("parent")
      .eq(1)
      .within(() => {
        cy.getByData("child").should("have.length", 4)
      })
  })
})
