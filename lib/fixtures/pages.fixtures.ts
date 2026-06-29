import { LoginPage } from "@pages/loginPage";
import { InventoryPage } from "@pages/inventoryPage";
import { ItemPage } from "@pages/itemPage";
import {test as baseTest} from "@playwright/test";

type MyPages = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    itemPage: ItemPage;
}

export const test = baseTest.extend<MyPages>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page)); 
    },
    
    inventoryPage: async ({page}, use) => {
        await use(new InventoryPage(page)); 
    },

    itemPage: async ({page}, use) => {
        await use(new ItemPage(page)); 
    },
})




