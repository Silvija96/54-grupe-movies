import { getAllCategories } from "../../db/admin/categories.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminMovieNew extends AdminPageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
        this.pageJS = 'admin-movie';
    }

    async main() {
        const categories = await getAllCategories();

        let categoriesHTML = '<option value="0">-- select category</option>';
        for (const cat of categories) {
            categoriesHTML += `<option value="${cat.id}">${cat.name}</option>`;
        }

        return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">New movie</h1>
                <form action="/api/admin/upload" data-method="POST" class="needs-validation col-12 col-md-10 col-lg-8 col-xl-6 mb-3">
                    <div class="row g-3">
                        <div class="col-12">
                            <label for="thumbnail" class="form-label">Thumbnail</label>
                            <input class="form-control" id="thumbnail" type="file" required>
                            <div class="invalid-feedback">
                                Valid image is required.
                            </div>
                        </div>
                        <img id="image" class="col-12" style="max-height: 20rem; object-fit: contain;" src="/img/default.webp" alt="">
                    </div>
                </form>
                <form action="/api/admin/movies" data-method="POST" class="needs-validation col-12 col-md-10 col-lg-8 col-xl-6">
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
                            <textarea class="form-control" id="description" placeholder=""></textarea>
                            <div class="invalid-feedback">
                                Valid description is required.
                            </div>
                        </div>
                        <p class="col-sm-12 mb-0">Duration:</p>
                        <div class="col-sm-6">
                            <label for="duration_hours" class="form-label">hours</label>
                            <input type="number" min="0" max="10" step="1" class="form-control" id="duration_hours" placeholder="" value="0">
                        </div>
                        <div class="col-sm-6">
                            <label for="duration_minutes" class="form-label">minutes</label>
                            <input type="number" min="0" max="59" step="1" class="form-control" id="duration_minutes" placeholder="" value="0">
                        </div>
                        <div class="col-12 col-sm-6">
                            <label for="category" class="form-label">Genre</label>
                            <select class="form-control" id="category">${categoriesHTML}</select>
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