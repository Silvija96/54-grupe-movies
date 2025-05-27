import { tableCategories } from "../../components/tableCategories.js";
import { getCategoriesDraft } from "../../db/admin/getAllCategories.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminCategoriesDraft extends AdminPageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
    }

    async main() {
        const data = await getCategoriesDraft();

        return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">Draft categories</h1>
                ${tableCategories(data)}
            </main>`;
    }
}