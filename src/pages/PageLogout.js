import { PageTemplate } from "../templates/PageTemplate.js";

export class PageLogout extends PageTemplate {
    constructor(req) {
        super(req);
        this.pageJS = 'logout';
    }

    async main() {
        return `
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="display-1">Do you really want to logout?????</h1>
                            <form>
                                <button type="submit" class="btn btn-primary" >Logout</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>`;
    }
}