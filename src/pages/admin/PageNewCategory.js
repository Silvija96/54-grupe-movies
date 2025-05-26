import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminNewCategory extends AdminPageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
    }

    async main() {
        return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">New category</h1>
            </main>`;
    }
}