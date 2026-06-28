import { LoginPage } from "@pages/loginPage";
import {test as baseTest} from "@playwright/test";

type MyPages = {
    loginPage: LoginPage;

}

export const test = baseTest.extend<MyPages>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page)); 
    },
})




