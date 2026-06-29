import { expect, type Locator, type Page } from '@playwright/test';
import { Product } from '@interfaces/Product';

export class InventoryPage {
    readonly page: Page;
    readonly productCards: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCards = page.getByTestId('inventory-item');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
    }

    private getProductCard(product: Product): Locator {
        return this.productCards.filter({
            has: this.page.getByTestId('inventory-item-name').filter({
                hasText: product.productName,
            }),
        });
    }

    private getProductName(card: Locator): Locator {
        return card.getByTestId('inventory-item-name');
    }

    private getProductDescription(card: Locator): Locator {
        return card.getByTestId('inventory-item-desc');
    }

    private getProductPrice(card: Locator): Locator {
        return card.getByTestId('inventory-item-price');
    }

    private getProductImage(card: Locator): Locator {
        return card.getByRole('img');
    }

    private getAddToCartButton(card: Locator): Locator {
        return card.getByRole('button', {name: 'Add to cart'});
    }

    private getRemoveFromCartButton(card: Locator): Locator {
        return card.getByRole('button', {name: 'Remove'});
    }

    async verifyProductDetails(product: Product) {
        const card = this.getProductCard(product);

        await expect(card).toHaveCount(1);

        await expect(this.getProductName(card)).toHaveText(product.productName);
        await expect(this.getProductDescription(card)).toHaveText(product.productDescription);
        await expect(this.getProductPrice(card)).toHaveText(`$${product.productPrice}`);
        await expect(this.getProductImage(card)).toHaveScreenshot(product.productName+'.png', {maxDiffPixelRatio: 0.01})
    }

    async verifyAllProductDetails(products: Product[]) {
        await expect(this.productCards).toHaveCount(products.length);

        for (const product of products) {
            await this.verifyProductDetails(product);
        }
    }

    async addToCart(product: Product) {
        const card = this.getProductCard(product);
        await this.getAddToCartButton(card).click();
    }

    async addAllToCart(products: Product[]) {
        let count: number = 0;
        for (const product of products) {
            await this.addToCart(product);
            count++;
            await expect(this.cartBadge).toHaveText(String(count))
        }
    }

    async removeFromCart(product: Product) {
        const card = this.getProductCard(product);
        await this.getRemoveFromCartButton(card).click();
    }

    async removeAllFromCart(products: Product[]) {
        let count: number = Number(await this.cartBadge.innerText());
        for (const product of products) {
            await this.removeFromCart(product);
            count--;

            if(count != 0) {
                await expect(this.cartBadge).toHaveText(String(count));
            }
            else {
                await expect(this.cartBadge).toBeHidden();
            }
        }
    }
}