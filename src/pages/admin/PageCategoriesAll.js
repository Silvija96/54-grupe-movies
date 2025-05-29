import { tableCategories } from "../../components/tableCategories.js";
import { getAllCategories } from "../../db/admin/categories.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminCategories extends AdminPageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
        this.pageJS = 'admin-category-delete';
    }

    async main() {
        const data = await getAllCategories();

        return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">All categories</h1>
                ${tableCategories(data)}
            </main>`;
    }
}
