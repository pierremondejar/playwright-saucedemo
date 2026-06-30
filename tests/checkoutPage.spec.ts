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

    test('should be able to handle invalid customer details input', async({checkoutPage}) => {
        await checkoutPage.inputInvalidCustomerDetails(CustomerData.invalidCustomers);
    })

    test('should be able to verify all checkout info', async({checkoutPage}) => {
        await checkoutPage.inputCustomerData(CustomerData.validCustomers);
        await checkoutPage.continueButton.click();
        await checkoutPage.verifyAllCheckoutInfo(ProductData.products);
    })

    test('should be able to complete the checkout process', async({checkoutPage}) => {
        await checkoutPage.inputCustomerData(CustomerData.validCustomers);
        await checkoutPage.continueButton.click();
        await checkoutPage.finishButton.click();
        await checkoutPage.verifyCheckoutCompletePage();
    })
})