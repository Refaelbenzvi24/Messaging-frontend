import "cypress-localstorage-commands"


describe('Messaging', () => {
	beforeEach(() => {
		cy.viewport('macbook-16')
		cy.setLocalStorage('theme', 'light')
		cy.visit('/')
	})

	it('should have a title', () => {
		cy.contains('Messaging')
	})

	it('should change language', () => {
		cy.contains('My Messages')
		cy.get('#language-toggle-button')
			.click()
		cy.contains('ההודעות שלי')
	})

	it('should change theme', () => {
		cy.get('body')
			.should('have.css', 'background-color')
			.and('eq', 'rgb(255, 255, 255)')
		cy.get('#theme-toggle-button')
			.click()
		cy.get('body')
			.should('have.css', 'background-color')
			.and('eq', 'rgb(24, 24, 24)')
	})

	it('should navigate to the home page', () => {
		cy.get('#home-button')
			.click()
		cy.contains('Global Crypto Stats')
	})
})
