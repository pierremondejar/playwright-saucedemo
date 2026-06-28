import { test } from '@fixtures/pages.fixtures'       
import { credentials } from '@datafactory/credentials';
import { expect } from '@playwright/test';

test.describe('Login Page', () => {
    test.beforeEach(async({loginPage}) => {
        await loginPage.page.goto('/')

    })

    test('should allow users with valid credentials to login', async({loginPage}) => {
        const { username, password } = credentials.validUser;
        await loginPage.logIn(username, password);
        await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    test('should not allow users with invalid credentials to login', async({loginPage}) => {
        const { username: username, password: password } = credentials.invalidUser;
        await loginPage.logIn(username, password);
        await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.errorMessage).toBeVisible();
    })


});


