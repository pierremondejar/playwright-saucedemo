import { expect, type Locator, type Page } from '@playwright/test';
import { Product } from '@interfaces/Product';
import { InventoryPage } from '@pages/inventoryPage';

export class CartPage extends InventoryPage {
    readonly page: Page;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.itemName = page.getByTestId('inventory-item-name');
        this.itemDescription = page.getByTestId('inventory-item-desc');
        this.itemPrice = page.getByTestId('inventory-item-price');
        this.checkoutButton = page.getByRole('button', {name: 'Checkout'})
    }

    async verifyCartItems(products: Product[]) {
        for (let index = 0; index < products.length; index++) {
            await expect(this.itemName.nth(index)).toHaveText(products[index].productName);
            await expect(this.itemDescription.nth(index)).toHaveText(products[index].productDescription);
            await expect(this.itemPrice.nth(index)).toHaveText(`$${products[index].productPrice}`);
        }    
    }
}