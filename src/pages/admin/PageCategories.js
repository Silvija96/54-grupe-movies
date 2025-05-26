import { getAllCategories } from "../../db/getAllCategories.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminCategories extends AdminPageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
    }

    async main() {
        const data = await getAllCategories();
        let HTML = '';

        for (const item of data) {
            HTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.count}</td>
                    <td>${item.url_slug}</td>
                    <td>${item.description ? '<div class="badge rounded-pill bg-success">Provided</div>' : '<div class="badge rounded-pill bg-danger">Missing</div>'}</td>
                    <td>
                        <div style="display: flex; gap: 0.3rem;">
                            <a class="btn btn-primary" href="/admin/categories/${item.url_slug}/edit">Edit</a>
                            <button class="btn btn-danger" type="button">Delete</button>
                        </div>
                    </td>
                </tr>`;
        }

        return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">All categories</h1>
                <div class="table-responsive small">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Movies count</th>
                                <th scope="col">Url</th>
                                <th scope="col">Description</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>${HTML}</tbody>
                    </table>
                </div>
            </main>`;
    }
}