import { test } from '@fixtures/pages.fixtures'       
import { ProductData } from '@datafactory/productsFactory';

test.describe('Inventory Page', () => {
    test.beforeEach(async({inventoryPage, loginPage}) => {
        await inventoryPage.page.goto('/inventory.html')
    })

    test('should verify that all product details are displaying correctly', async({inventoryPage}) => {
        await inventoryPage.verifyAllProductDetails(ProductData.products);
    })
})
