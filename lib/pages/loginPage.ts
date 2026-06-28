import { expect, type Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.username = page.getByRole('textbox', {name: 'Username'});
        this.password = page.getByRole('textbox', {name: 'Password'});
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.errorMessage = page.getByRole('heading', {name: 'Epic sadface: Username and password do not match any user in this service'});
        
    }

    async logIn(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    } 

}       