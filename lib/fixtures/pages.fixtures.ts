import { LoginPage } from "@pages/loginPage";
import { InventoryPage } from "@pages/inventoryPage";
import {test as baseTest} from "@playwright/test";

type MyPages = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
}

export const test = baseTest.extend<MyPages>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page)); 
    },
    
    inventoryPage: async ({page}, use) => {
        await use(new InventoryPage(page)); 
    },
})




