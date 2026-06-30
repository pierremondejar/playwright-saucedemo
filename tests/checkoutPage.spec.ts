import { test } from '@fixtures/pages.fixtures'       
import { ProductData } from '@datafactory/productsFactory';
import { CustomerData } from '@datafactory/customersFactory';
import { CheckoutPage } from '@pages/checkoutPage';

test.describe('Checkout Page', () => {
    test.beforeEach(async({checkoutPage}) => {
        await checkoutPage.page.goto('/inventory.html');
        await checkoutPage.addAllToCart(ProductData.products);
        await checkoutPage.cartBadge.click();
        await checkoutPage.checkoutButton.click();
    })

    test('should be able to input valid customer details input', async({checkoutPage}) => {
        await checkoutPage.inputValidCustomerDetails(CustomerData.validCustomers);
    })

    test('should be able handle invalid customer details input', async({checkoutPage}) => {
        await checkoutPage.inputInvalidCustomerDetails(CustomerData.invalidCustomers);
    })
})