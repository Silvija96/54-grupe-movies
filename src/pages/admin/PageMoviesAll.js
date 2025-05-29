import { tableMovies } from "../../components/tableMovies.js";
import { getAllMovies } from "../../db/admin/movies.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminMovies extends AdminPageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
    }

    async main() {
        const data = await getAllMovies();

        return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">All movies</h1>
                ${tableMovies(data)}
            </main>`;
    }
}