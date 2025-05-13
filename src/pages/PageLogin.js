import { PageTemplate } from "../templates/PageTemplate.js";

export class PageLogin extends PageTemplate {
    main() {
        return `
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-10 col-lg-6 col-xl-5 col-xxl-4">
                            <h1 class="display-1">Login</h1>
                           <div class="alert alert-danger d-none" role="alert">
                                A simple danger alert—check it out!
                            </div>
                            <form>
                                <div class="form-floating">
                                    <input type="email" class="form-control" id="email" placeholder="name@example.com">
                                    <label for="email">Email address</label>
                                </div>
                                <div class="form-floating">
                                    <input type="password" class="form-control" id="password" placeholder="Password">
                                    <label for="password">Password</label>
                                </div>
                                <button class="btn btn-primary w-100 py-2" type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>`;
    }
}