import { getAllMovies } from "../../db/public/movies.js";
import { formatMovieDuration } from "../../lib/formatMovieDuration.js";
import { PageTemplate } from "../../templates/PageTemplate.js";

export class PageMovies extends PageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = 1;
    }

    async moviesList() {
        let HTML = '';

        const moviesData = await getAllMovies();

        for (const item of moviesData) {
            HTML += `
                <div class="col">
                    <div class="card shadow-sm">
                        <img src="/img/movie-thumbnails/${item.thumbnail}" class="movie-card-thumbnail card-img-top" style="height: 225px;">
                        <div class="card-body">
                            <a href="/movies/${item.url_slug}" class="h4">${item.title}</a>
                            <p class="card-text">${item.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a href="/movies/${item.url_slug}" class="btn btn-sm btn-outline-secondary">Read more</a>
                                </div>
                                <small class="text-body-secondary">${formatMovieDuration(item.duration)}</small>
                            </div>
                        </div>
                    </div>
                </div>`;
        }

        if (HTML) {
            return `
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">${HTML}</div>
                </div>`;
        }

        return `
            <div class="container">
                <div class="row">
                    <p class="col-12">No movies found for this genre :(</p>
                    <div class="col-12">
                        <a href="/movies" class="btn btn-primary">View all movies</a>
                    </div>
                </div>
            </div>`;
    }

    async main() {
        return `
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="display-1">All movies</h1>
                        </div>
                    </div>
                </div>
                ${await this.moviesList()}
            </main>`;
    }
}