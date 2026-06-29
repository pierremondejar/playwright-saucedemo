import { test as setup } from '@playwright/test';

setup('Authenticate', async ({ page}) => {
    const username = process.env.STANDARD_USERNAME!;
    const password = process.env.STANDARD_PASSWORD!;
    const baseURL = process.env.BASEURL!;

    await page.goto(baseURL);
    await page.getByRole('textbox', {name: 'Username'}).fill(username);
    await page.getByRole('textbox', {name: 'Password'}).fill(password);
    await page.getByRole('button', {name: 'Login'}).click();
    await page.waitForLoadState('networkidle');

    await page.context().storageState({
    path: 'playwright/.auth/user.json',
    indexedDB: true,
    });
});