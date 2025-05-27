import { getMovieBySlug } from "../../db/public/movies.js";
import { formatMovieDuration } from "../../lib/formatMovieDuration.js";
import { PageTemplate } from "../../templates/PageTemplate.js";

export class PageMovieInner extends PageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = 1;
    }

    notFoundSection() {
        return `
            <div class="container px-4 py-5">
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div class="col-10 col-sm-8 col-lg-6">
                        <img src="/img/movies-hero.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"> </div> <div class="col-lg-6">
                        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Movie not found</h1>
                        <p class="lead">Movie with address "${this.req.params.movieTitle}" not found.</p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                            <a href="/movies" class="btn btn-primary btn-lg px-4 me-md-2">View all movies</a>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    movieSection(movie) {
        return `
            <div class="container px-4 py-5">
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div class="col-10 col-sm-8 col-lg-6">
                        <img src="/img/movie-thumbnails/${movie.thumbnail}" class="movie-inner-thumbnail d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy"> </div> <div class="col-lg-6">
                        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">${movie.title}</h1>
                        <p class="lead">${movie.description}</p>
                        <p class="lead">Duration: ${formatMovieDuration(movie.duration)}</p>
                        <p class="lead">Genre: <a href="/movies-by-category/${movie.categoryUrlSlug.toLowerCase()}">${movie.categoryName}</a></p>
                    </div>
                </div>
            </div>`;
    }

    async main() {
        const slug = this.req.params.movieTitle;
        const data = await getMovieBySlug(slug);

        return `
            <main>
                ${data.length ? this.movieSection(data[0]) : this.notFoundSection()}
            </main>`;
    }
}