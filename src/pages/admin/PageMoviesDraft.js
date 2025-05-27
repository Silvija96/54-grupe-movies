import { tableMovies } from "../../components/tableMovies.js";
import { getAllMoviesDraft } from "../../db/admin/getAllMovies.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminMoviesDraft extends AdminPageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
    }

    async main() {
        const data = await getAllMoviesDraft();

        return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">Draft movies</h1>
                ${tableMovies(data)}
            </main>`;
    }
}