import { Page, expect } from '@playwright/test'

export class LocationPage {
    // Setup
    readonly page: Page
    // Locators
    readonly cookiesBtn
    readonly locationForm
    readonly state
    readonly zipCode
    readonly purpose
    readonly submitLocation
    readonly hOneTitle

    constructor(page: Page) {
        // Setup
        this.page = page
        // Locators
        this.cookiesBtn = page.getByRole('button', { name: 'Agree to all' })
        this.locationForm = page.getByRole('heading', { name: 'Please select your location' })
        this.state = page.getByLabel('* Your state')
        this.zipCode = page.locator('[data-test-id="modal-popup__location"]').getByLabel('', { exact: true })
        this.purpose = page.locator('label').filter({ hasText: 'Private' }).locator('div')
        this.submitLocation = page.locator('[data-test-id="state-selected-modal__close"]')
        this.hOneTitle = page.getByRole('heading', { name: 'Explore available vehicles' })
    }

    ////////////////////
    //// NAVIGATION ////
    ////////////////////
    async navToMainBaseUrl() {
        await this.page.goto('en-au/shop/vehicle/srp/demo?sort=relevance-demo&assortment=vehicle')
        await this.page.waitForLoadState()
        await expect(this.cookiesBtn).toBeVisible()
        await this.cookiesBtn.click()
        await this.checkLocationForm()
    }

    ////////////////////
    ////// STEPS ///////
    ////////////////////

    async fillLocationForm() {
        await this.page.waitForLoadState()
        await this.state.selectOption('Western Australia')
        await this.zipCode.click()
        await this.zipCode.fill('6990')
        await this.purpose.click()
        await this.submitLocation.click()
        await this.checkVehiclePage()
    }

    ////////////////////
    //// ASSERTIONS ////
    ////////////////////
    async checkLocationForm() {
        await expect(this.locationForm).toBeVisible()
    }

    async checkVehiclePage() {
        await expect(this.hOneTitle).toBeVisible()
    }
}