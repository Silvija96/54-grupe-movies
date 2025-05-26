import { PageTemplate } from "../../templates/PageTemplate.js";

export class Page401 extends PageTemplate {
    constructor(req) {
        super(req);
    }

    async main() {
        return `
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="display-1">Unauthorized</h1>
                            <img style="max-width: 30rem;" src="https://http.dog/401.jpg" alt="Unauthorized">
                            <a class="btn btn-primary" href="/login">Login</a>
                            <a class="btn btn-primary" href="/register">Register</a>
                        </div>
                    </div>
                </div>
            </main>`;
    }
}