import { tableCategories } from "../../components/tableCategories.js";
import { getCategoriesPublished } from "../../db/admin/getAllCategories.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminCategoriesPublished extends AdminPageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
    }

    async main() {
        const data = await getCategoriesPublished();

        return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">Published categories</h1>
                ${tableCategories(data)}
            </main>`;
    }
}