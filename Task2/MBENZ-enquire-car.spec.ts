// Setup
import { test } from '@playwright/test'
import { LocationPage } from './location-page'
import { VehiclePage } from './vehicle-page'

test('Enquire a highest price @negative ', async ({ page }) => {
    // Page objects
    const locationPage = new LocationPage(page)

    await test.step('Given I navigate to a Mercedes Benz URL', async () => {
        await locationPage.navToMainBaseUrl()
    })

    await test.step('And I fill the location Form', async () => {
        await locationPage.fillLocationForm()
    })

    const vehiclePage = new VehiclePage(page)

    await test.step('When I select an preowned car', async () => {
        await vehiclePage.ownedTab()
    })

    await test.step('And I sort by the descending price', async () => {
        await vehiclePage.sortAction()
    })

    await test.step('Then I expect to get an error since data is not filled properly', async () => {
        await vehiclePage.saveInformation()
        await vehiclePage.fillForm()
        await vehiclePage.checkErrorLog()
    })

})