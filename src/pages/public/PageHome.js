import { categoriesList } from "../../components/categoriesList.js";
import { PageTemplate } from "../../templates/PageTemplate.js";

export class PageHome extends PageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = 0;
    }

    heroSection() {
        return `
            <div class="container px-4 py-5">
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div class="col-10 col-sm-8 col-lg-6">
                        <img src="/img/movies-hero.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"> </div> <div class="col-lg-6">
                        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Welcome to the Movies!</h1>
                        <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                            <a href="/movies" class="btn btn-primary btn-lg px-4 me-md-2">View all movies</a>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    featuredMovieCategoriesSection() {
        const data = [];

        return `
            <style>
                .feature-icon {
                    width: 4rem;
                    height: 4rem;
                    border-radius: .75rem;
                }
                .bi {
                    vertical-align: -.125em;
                    fill: currentColor
                }
                .icon-link>.bi {
                    flex-shrink: 0;
                    width: 1em;
                    height: 1em;
                    fill: currentcolor;
                    transition: .2s ease-in-out transform;
                }
            </style>
            <div class="container px-4 py-5" id="featured-3">
                <h2 class="pb-2 border-bottom">Movies by category</h2>
                <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">${categoriesList(data)}</div>
            </div>`;
    }

    async main() {
        return `
            <main>
                ${this.heroSection()}
                ${this.featuredMovieCategoriesSection()}
            </main>`;
    }
}