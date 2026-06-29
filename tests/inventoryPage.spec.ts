import { test } from '@fixtures/pages.fixtures'       
import { ProductData } from '@datafactory/productsFactory';
import { InventoryPage } from '@pages/inventoryPage';

test.describe('Inventory Page', () => {
    test.beforeEach(async({inventoryPage, loginPage}) => {
        await inventoryPage.page.goto('/inventory.html')
    })

    test('should verify that all product details are displaying correctly', async({inventoryPage}) => {
        await inventoryPage.verifyAllProductDetails(ProductData.products);
    })

    test('should be able to add products to the cart', async({inventoryPage}) => {
        await inventoryPage.addAllToCart(ProductData.products);
    })

    test('should be able to remove products from the cart', async({inventoryPage}) => {
        await inventoryPage.addAllToCart(ProductData.products);
        await inventoryPage.removeAllFromCart(ProductData.products);
    })
})
