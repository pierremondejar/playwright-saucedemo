import { expect, type Locator, type Page } from '@playwright/test';
import { Customer } from '@interfaces/Customer';
import { CartPage } from '@pages/cartPage';

export class CheckoutPage extends CartPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton:Locator;
    readonly errorText: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;  
        this.firstName = page.getByRole('textbox', {name: 'First Name'});
        this.lastName = page.getByRole('textbox', {name: 'Last Name'});
        this.postalCode = page.getByRole('textbox', {name: 'Zip/Postal Code'});
        this.continueButton = page.getByRole('button', {name: 'Continue'});
        this.errorText = page.getByTestId('error');
    }

    async inputValidCustomerDetails(validCustomers: Customer[]) {
        for (let index = 0; index < validCustomers.length; index++) {
            await this.firstName.fill(validCustomers[index].firstName);
            await this.lastName.fill(validCustomers[index].lastName);
            await this.postalCode.fill(validCustomers[index].postalCode);
            await this.continueButton.click();
            await this.page.goBack();
        }  
    }

    async inputInvalidCustomerDetails(invalidCustomers: Customer[]) {
        for (let index = 0; index < invalidCustomers.length; index++) {
            await this.firstName.fill(invalidCustomers[index].firstName);
            await this.lastName.fill(invalidCustomers[index].lastName);
            await this.postalCode.fill(invalidCustomers[index].postalCode);
            await this.continueButton.click();
            await expect(this.errorText).toHaveText(`Error: ${invalidCustomers[index].error}`)
            await this.page.reload();
        }  
    }
}