import { expect, type Locator, type Page } from '@playwright/test';
import { Customer } from '@interfaces/Customer';
import { Product } from '@interfaces/Product';
import { CartPage } from '@pages/cartPage';

export class CheckoutPage extends CartPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton:Locator;
    readonly errorText: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;  
        this.firstName = page.getByRole('textbox', {name: 'First Name'});
        this.lastName = page.getByRole('textbox', {name: 'Last Name'});
        this.postalCode = page.getByRole('textbox', {name: 'Zip/Postal Code'});
        this.continueButton = page.getByRole('button', {name: 'Continue'});
        this.errorText = page.getByTestId('error');
        this.subtotalLabel = page.getByTestId('subtotal-label');
        this.taxLabel = page.getByTestId('tax-label');
        this.totalLabel = page.getByTestId('total-label');
        this.finishButton = page.getByRole('button', {name: 'Finish'})
        this.completeHeader = page.getByTestId('complete-header');
        this.completeText = page.getByTestId('complete-text')
        this.backHomeButton = page.getByRole('button', {name: 'Back Home'})
    }

    async inputCustomerData(Customers: Customer[], index: number = 0){
        await this.firstName.fill(Customers[index].firstName);
        await this.lastName.fill(Customers[index].lastName);
        await this.postalCode.fill(Customers[index].postalCode);
    }

    async inputValidCustomerDetails(validCustomers: Customer[]) {
        for (let index = 0; index < validCustomers.length; index++) {
            await this.inputCustomerData(validCustomers, index);
            await this.continueButton.click();
            await this.page.goBack();
        }  
    }

    async inputInvalidCustomerDetails(invalidCustomers: Customer[]) {
        for (let index = 0; index < invalidCustomers.length; index++) {
            await this.inputCustomerData(invalidCustomers, index);
            await this.continueButton.click();
            await expect(this.errorText).toHaveText(`Error: ${invalidCustomers[index].error}`)
            await this.page.reload();
        }  
    }

    async verifyAllCheckoutInfo(products: Product[]){
        let itemTotal: number = 0;
        let tax: number = 0;
        let total: number = 0;

        for (let index = 0; index < products.length; index++) {
            await expect(this.itemName.nth(index)).toHaveText(products[index].productName);
            await expect(this.itemDescription.nth(index)).toHaveText(products[index].productDescription);
            await expect(this.itemPrice.nth(index)).toHaveText(`$${products[index].productPrice}`);
            itemTotal+=products[index].productPrice;
        }
        
        tax = Number((itemTotal * (8.0036/100)).toFixed(2));
        total = tax + itemTotal;

        await expect(this.subtotalLabel).toHaveText(`Item total: $${itemTotal}`);
        await expect(this.taxLabel).toHaveText(`Tax: $${tax.toFixed(2)}`);
        await expect(this.totalLabel).toHaveText(`Total: $${total}`);
    }

    async verifyCheckoutCompletePage(){
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
        await expect(this.completeText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(this.backHomeButton).toBeEnabled();
        await expect(this.cartBadge).toBeHidden();
    }


}