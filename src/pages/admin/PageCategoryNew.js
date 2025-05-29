import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminCategoryNew extends AdminPageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
        this.pageJS = 'admin-category';
    }

    async main() {
        return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">New category</h1>
                <form action="/api/admin/categories" data-method="POST" class="needs-validation col-12 col-md-10 col-lg-8 col-xl-6">
                    <div class="row g-3">
                        <div class="col-sm-12">
                            <label for="name" class="form-label">Movie name</label>
                            <input type="text" class="form-control" id="name" placeholder="" value="" required>
                            <div class="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <label for="url" class="form-label">URL slug</label>
                            <input type="text" class="form-control" id="url" placeholder="" value="" required>
                            <div class="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" placeholder="" required></textarea>
                            <div class="invalid-feedback">
                                Valid description is required.
                            </div>
                        </div>
                        <div class="my-3">
                            <div class="form-check">
                                <input id="draft" value="draft" name="status" type="radio" class="form-check-input" checked required>
                                <label class="form-check-label" for="draft">Draft</label>
                            </div>
                            <div class="form-check">
                                <input id="publish" value="publish" name="status" type="radio" class="form-check-input" required>
                                <label class="form-check-label" for="publish">Publish</label>
                            </div>
                        </div>
                    </div>
                    <hr class="my-4">
                    <div class="d-flex" style="gap: 1rem;">
                        <button class="btn btn-success btn-lg" type="submit">Create</button>
                        <button class="btn btn-secondary btn-lg ms-auto" type="reset">Reset</button>
                    </div>
                </form>
            </main>`;
    }
}