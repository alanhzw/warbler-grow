/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-26 16:18:35
 * @LastEditTime: 2021-11-26 17:11:30
 * @FilePath: \jest-test\tests\e2e\specs\views\BigWheel.js
 */
describe('big wheel', () => {
  it('test', () => {

    cy.visit('/big-wheel1')
    cy.get('.pointer').click();
    cy.get(".plate")
      .should('has.attr', 'style')
      .should('contain', 'transform:rotate(5.625turn)')
    cy.on("window:alert", (msg) => {
      expect(msg).tpEqual('获得京豆')
    })
  })
})