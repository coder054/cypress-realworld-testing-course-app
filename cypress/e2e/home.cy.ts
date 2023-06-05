import util from "../../utils/utils"
import constants from "../../constants/constants"

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

const getTexts = (elements: Cypress.Chainable<JQuery<HTMLElement>>) => {
  const texts = []
  elements.each((item) => {
    texts.push(item.text())
  })
  return texts
}

describe("home page", () => {
  beforeEach(function () {})
  it("the h1 contains the correct text", () => {
    cy.visit("http://localhost:3000")
    cy.get("[data-test='hero-heading']").contains(
      "Testing Next.js Applications with Cypress"
    )
  })

  it("the features on the homepage are correct", () => {
    cy.visit("http://localhost:3000", {
      onBeforeLoad() {
        // cy.spy(util, "getUppercase")
        // cy.stub(util, "getUppercase").returns("FOO")
      },
    })

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
    cy.log("11111111111")
    cy.getByData("feature-name").its("length").should("equal", 3)
    cy.log("22222222222")
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

    const obj = {
      foo() {},
    }

    const spy = cy.spy(obj, "foo").as("anyArgs")

    obj.foo()

    // assert against the spy directly
    expect(spy).to.be.called
    // or get the spy via its reference
    cy.get("@anyArgs").should("have.been.called")

    // cy.getByData("child").first().invoke("text").should("eq", "abc")
  })
  it.only("test", () => {
    cy.stub(constants, "ABC").value("no")
    cy.visit("http://localhost:3000")
    cy.getByData("abcd").should("have.length", 1)

    cy.get("a").as("links")
    cy.get("@links").first().click()
  })
})
