import { PageTemplate } from "./PageTemplate.js";

export class AdminPageTemplate extends PageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = -1;
        this.pageJS = '';
        this.isPublicPage = false;
    }

    adminSidebar() {
        return `
            <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="sidebarMenuLabel">Company name</h5> <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="/admin">
                                    Dashboard
                                </a>
                            </li>
                        </ul>
                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                            <span>Categories</span>
                        </h6>
                        <ul class="nav flex-column mb-auto">
                            <li class="nav-item">
                                <a class="nav-link d-flex align-items-center gap-2" href="/admin/categories/new">
                                    Add new
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link d-flex align-items-center gap-2" href="/admin/categories">
                                    All categories
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link d-flex align-items-center gap-2" href="/admin/categories/published">
                                    Published categories
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link d-flex align-items-center gap-2" href="/admin/categories/draft">
                                    Draft categories
                                </a>
                            </li>
                        </ul>
                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                            <span>Movies</span>
                        </h6>
                        <ul class="nav flex-column mb-auto">
                            <li class="nav-item">
                                <a class="nav-link d-flex align-items-center gap-2" href="/admin/movies/new">
                                    Add new
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link d-flex align-items-center gap-2" href="/admin/movies">
                                    All movies
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link d-flex align-items-center gap-2" href="/admin/movies/published">
                                    Published movies
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link d-flex align-items-center gap-2" href="/admin/movies/draft">
                                    Draft movies
                                </a>
                            </li>
                        </ul>
                        <hr class="my-3">
                        <ul class="nav flex-column mb-auto">
                            <li class="nav-item">
                                <a class="nav-link d-flex align-items-center gap-2" href="#">
                                    Settings
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`;
    }

    async render() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            ${this.head()}
            <body>
                ${this.header()}
                <div class="container-fluid">
                    <div class="row">
                        ${this.adminSidebar()}
                        ${await this.main()}
                    </div>
                </div>
                ${this.footer()}
                ${this.script()}
            </body>
            </html>`;
    }
}