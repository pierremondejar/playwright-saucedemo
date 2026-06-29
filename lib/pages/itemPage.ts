import { expect, type Locator, type Page } from '@playwright/test';
import { Product } from '@interfaces/Product';
import { ProductData } from '@datafactory/productsFactory';
import { InventoryPage } from './inventoryPage';

export class ItemPage extends InventoryPage {
    readonly page: Page;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly itemImage: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.itemName = page.getByTestId('inventory-item-name');
        this.itemDescription = page.getByTestId('inventory-item-desc');
        this.itemPrice = page.getByTestId('inventory-item-price');
        this.itemImage = page.locator('.inventory_details_img')
    }

    async selectItem(index: number) {
        const card = this.productCards.nth(index);
        await this.getProductName(card).click();
        
    }

    async verifyAllProductDetails(products: Product[]) {
        for (let index = 0; index < products.length; index++) {
            await this.selectItem(index);
            await this.verifyItemDetails(products[index])
            await this.page.goBack();
        }
    }

    async verifyItemDetails(product:Product){
        //const test =  this.itemImageContainer.filter({has: this.page.locator('.inventory_details_img')})
        await expect(this.itemName).toHaveText(product.productName);
        await expect(this.itemDescription).toHaveText(product.productDescription);
        await expect(this.itemPrice).toHaveText(`$${product.productPrice}`);
        await expect(this.itemImage).toHaveScreenshot(product.productName+'.png', {maxDiffPixelRatio: 0.01});
    }


}