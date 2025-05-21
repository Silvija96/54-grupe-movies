import { PageTemplate } from "../templates/PageTemplate.js";

export class PageDashboard extends PageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = this.req.cookies.loginToken ? 3 : -1;
    }

    notLoggedInContent() {
        return `
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="display-1">Error: private page</h1>
                        </div>
                    </div>
                    <div class="row">
                        <a class="btn btn-primary" href="/login">Login</a>
                    </div>
                </div>
            </main>`;
    }

    adminContent() {
        return `
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="display-1">Dashboard</h1>
                        </div>
                    </div>
                    <div class="row">
                        <p class="col-12">Your email: ???????????</p>
                    </div>
                </div>
            </main>`;
    }

    async main() {
        return this.req.cookies.loginToken
            ? this.adminContent()
            : this.notLoggedInContent();
    }
}