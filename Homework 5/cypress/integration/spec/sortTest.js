context('Filter', () => {

    beforeEach(() => {
        cy.visit('https://www.redfin.com/city/11203/CA/Los-Angeles')
    })
    
    it('Filter by price: valid range', () => {
        //set a price range
        cy.get('div[aria-label="Price"]').click()
        cy.get('input[placeholder="Enter min"]').type(100000)
        cy.get('input[placeholder="Enter max"]').type(999999)
        cy.get('button[class="button Button primary"]').click()
        //check if redirected correctly
        cy.url().should('equal', 'https://www.redfin.com/city/11203/CA/Los-Angeles/filter/min-price=100k,max-price=1000k')
        //check that all homecards in the first page are in the specified price range
        for (let i = 0; i < 39; i++) {
            cy.get('span[class="homecardV2Price"').eq(i).invoke('text').should('have.length', 8)
        }
        
    }) 

    it('Filter by price: too big min', () => {
        //set a price range
        cy.get('div[aria-label="Price"]').click()
        cy.get('input[placeholder="Enter min"]').type(500000000)
        cy.get('button[class="button Button primary"]').click()
        //check if redirected correctly
        cy.url().should('equal', 'https://www.redfin.com/city/11203/CA/Los-Angeles/filter/min-price=500M')
        //check that there are no homes with in this range
        cy.get('div[data-rf-test-id="no-results-view"]').find('h2').invoke('text').should('eq', 'No results')
    }) 

    it('Filter by price: string input', () => {
        //set an invalid price range
        cy.get('div[aria-label="Price"]').click()
        cy.get('input[placeholder="Enter min"]').type("ttttt")
        cy.get('input[placeholder="Enter max"]').type("ccccc")
        cy.get('button[class="button Button primary"]').click()

        //check that no changes were made after an invalid input
        cy.url().should('equal', 'https://www.redfin.com/city/11203/CA/Los-Angeles')
        cy.get('span[class="CustomFilter__label padding-right-smallest"]').eq(1).invoke('text').should('eq', 'Price')
    })
   

    it('Filter by price: input max = 0', () => {
        //set an invalid price range
        cy.get('div[aria-label="Price"]').click()
        cy.get('input[placeholder="Enter max"]').type(0)
        cy.get('button[class="button Button primary"]').click()

        //check that no changes were made after an invalid input
        cy.url().should('equal', 'https://www.redfin.com/city/11203/CA/Los-Angeles')
        cy.get('span[class="CustomFilter__label padding-right-smallest"]').eq(1).invoke('text').should('eq', 'Price')
    }) 
    
})