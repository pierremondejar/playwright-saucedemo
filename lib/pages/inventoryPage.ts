import { expect, type Locator, type Page } from '@playwright/test';
import { Product } from '@interfaces/Product';

export class InventoryPage {
    readonly page: Page;
    readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCards = page.getByTestId('inventory-item');
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

    async verifyProductDetails(product: Product) {
        const card = this.getProductCard(product);

        await expect(card).toHaveCount(1);

        await expect(this.getProductName(card)).toHaveText(product.productName);
        await expect(this.getProductDescription(card)).toHaveText(product.productDescription);
        await expect(this.getProductPrice(card)).toHaveText(`$${product.productPrice}`);
    }

    async verifyAllProductDetails(products: Product[]) {
        await expect(this.productCards).toHaveCount(products.length);

        for (const product of products) {
            await this.verifyProductDetails(product);
        }
    }
}