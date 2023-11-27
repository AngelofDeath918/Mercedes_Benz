import { Page, expect } from '@playwright/test'
import { test } from '@playwright/test'
import fs from 'fs';

export class VehiclePage {
    // Setup
    readonly page: Page
    // Locators 
    readonly filterBtn
    readonly preOwnedtab
    readonly sortList
    readonly firstItem
    readonly errorMessage
    readonly username
    readonly lastName
    readonly email
    readonly zipcode
    readonly retailer
    readonly continueBtn

    constructor(page: Page) {
        // Setup
        this.page = page
        // Locators
        this.filterBtn = page.locator('.filter-toggle')
        this.preOwnedtab = page.getByRole('button', { name: 'Pre-Owned' })
        this.sortList = page.getByLabel('Sorting')
        this.firstItem = page.locator('.dcp-cars-product-tile > a')
        this.errorMessage = page.getByText('An error has occurred.Please check the following sections:')
        this.username = page.getByLabel('First Name')
        this.lastName = page.getByLabel('Last Name')
        this.email = page.getByLabel('E-Mail')
        this.zipcode = page.getByLabel('Postal Code')
        this.retailer = page.locator('[data-test-id="dcp-buy-box__contact-seller"]')
        this.continueBtn = page.locator('[data-test-id="dcp-rfq-contact-button-container__button-next"]')
    }

    ////////////////////
    ////// STEPS ///////
    ////////////////////

    async ownedTab() {
        await this.filterBtn.click()
        await this.preOwnedtab.click()
        await this.page.waitForLoadState()
    }

    async sortAction() {
        await this.sortList.selectOption('price-desc-ucos')
    }

    async fillForm() {
        const formData = await test.step('Given information for the form', async () => {
            return { username: 'Cristhiam', lastName: 'Guerrero', email: 'criscruz.com', zipcode: '6990' }
        })

        await test.step('Then I fill the form', async () => {
            await this.accountCreationForm(formData.username, formData.lastName, formData.email, formData.zipcode)
        })
    }

    async saveInformation() {
        await this.page.locator('a').filter({ hasText: 'Explore' }).first().click();
        const jsonResponse = await this.page.evaluate(() => {
            return fetch('https://shop.mercedes-benz.com/dcpoto-api/dcp-api/v2/dcp-mp-au/products/AU2300062438T?fields=FULL&upg=au-wa-price-group-p&lang=en')
                .then(response => response.json());
        });

        const vin = jsonResponse.vin;
        const model = jsonResponse.model;
        const data = {
            vin,
            model,
        };
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync('vehicleData.json', jsonData);
    }

    async accountCreationForm(username: string, lastName: string, email: string, zipcode: string) {
        await this.retailer.click();
        await this.username.fill(username);
        await this.lastName.fill(lastName)
        await this.email.fill(email)
        await this.zipcode.fill(zipcode)
        await this.continueBtn.click();
    }

    ////////////////////
    //// ASSERTIONS ////
    ////////////////////

    async checkErrorLog() {
        await expect(this.errorMessage).toBeVisible()
    }

}