import { expect, type Locator, type Page } from '@playwright/test';
import { Product } from '@interfaces/Product';
import { InventoryPage } from '@pages/inventoryPage';

export class ItemPage extends InventoryPage {
    readonly page: Page;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly itemImage: Locator;
    readonly addToCartButton: Locator;
    readonly removeFromCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.itemName = page.getByTestId('inventory-item-name');
        this.itemDescription = page.getByTestId('inventory-item-desc');
        this.itemPrice = page.getByTestId('inventory-item-price');
        this.itemImage = page.locator('.inventory_details_img');
        this.addToCartButton = page.getByRole('button', {name: 'Add to cart'});
        this.removeFromCartButton = page.getByRole('button', {name: 'Remove'});
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
        await expect(this.itemName).toHaveText(product.productName);
        await expect(this.itemDescription).toHaveText(product.productDescription);
        await expect(this.itemPrice).toHaveText(`$${product.productPrice}`);
        await expect(this.itemImage).toHaveScreenshot(product.productName+'.png',
            { 
                threshold: 1,
                maxDiffPixelRatio: 0.01, 
                animations: 'disabled',
                caret: 'hide',
                scale: 'css'
            }
        );
    }

    async addItemsToCart(products: Product[]) {
        for (let index = 0; index < products.length; index++) {
            await this.selectItem(index);
            await this.addToCartButton.click();
            await this.page.goBack();
            await expect(this.cartBadge).toHaveText(String(index+1)) 
        }
    }

    async removeItemsToCart(products: Product[]) {
        let count = products.length;
        for (let index = 0; index < count; index++) {
            await this.selectItem(index);
            await this.removeFromCartButton.click();
            await this.page.goBack();
            if(count-(index+1) != 0) {
                await expect(this.cartBadge).toHaveText(String(count-(index+1))) }
            else {
                await expect(this.cartBadge).toBeHidden();
            }
        }
    }


}