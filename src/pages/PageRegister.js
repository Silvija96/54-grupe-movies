import { PageTemplate } from "../templates/PageTemplate.js";

export class PageRegister extends PageTemplate {
    constructor(req) {
        super(req);
        this.pageJS = 'register';
    }

    main() {
        return `
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-10 col-lg-6 col-xl-5 col-xxl-4">
                            <h1 class="display-1">Register</h1>
                            <div id="error" class="alert alert-danger d-none" role="alert">
                                A simple danger alert—check it out!
                            </div>
                            <form>
                                <div class="form-floating">
                                    <input id="email" type="email" class="form-control" placeholder="name@example.com">
                                    <label for="email">Email address</label>
                                </div>
                                <div class="form-floating">
                                    <input id="password" type="password" class="form-control" placeholder="Password">
                                    <label for="password">Password</label>
                                </div>
                                <div class="form-check text-start my-3">
                                    <input class="form-check-input" type="checkbox" value="remember-me" id="tos">
                                    <label class="form-check-label" for="tos">Agree with Terms of Service</label>
                                </div>
                                <button class="btn btn-primary w-100 py-2" type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>`;
    }
}