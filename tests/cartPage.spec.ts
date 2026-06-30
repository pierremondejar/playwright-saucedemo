import { test } from '@fixtures/pages.fixtures'       
import { ProductData } from '@datafactory/productsFactory';

test.describe('Cart Page', () => {
    test.beforeEach(async({cartPage}) => {
        await cartPage.page.goto('/inventory.html');
    })

    test('should be able to verify item details on the cart page', async({cartPage}) => {
        await cartPage.addAllToCart(ProductData.products);
        await cartPage.cartButton.click();
        await cartPage.verifyCartItems(ProductData.products);
    })
})
