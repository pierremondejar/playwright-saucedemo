import { test } from '@fixtures/pages.fixtures'       
import { ProductData } from '@datafactory/productsFactory';

test.describe('Inventory Page', () => {
    test.beforeEach(async({itemPage}) => {
        await itemPage.page.goto('/inventory.html');
    })

    test('should be able to display product information on item pages correctly', async({itemPage}) => {
        await itemPage.verifyAllProductDetails(ProductData.products);
    })

    test('should be able to add products to the cart from the item page', async({itemPage}) => {
        await itemPage.addItemsToCart(ProductData.products);
    })

    test('should be able to remove products to the cart from the item page', async({itemPage}) => {
        await itemPage.addItemsToCart(ProductData.products);
        await itemPage.removeItemsToCart(ProductData.products);
    })

})