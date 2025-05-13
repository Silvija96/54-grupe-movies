import { PageTemplate } from "../templates/PageTemplate.js";

export class Page404 extends PageTemplate {
    main() {
        return `
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="display-1">Page not found</h1>
                            <a class="btn btn-primary" href="/">Back to home</a>
                        </div>
                    </div>
                </div>
            </main>`;
    }
}