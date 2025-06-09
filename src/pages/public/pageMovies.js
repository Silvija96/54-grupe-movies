import { getAllCategories } from "../../db/public/categories.js";
import { getAllMovies } from "../../db/public/movies.js";
import { formatMovieDuration } from "../../lib/formatMovieDuration.js";
import { PageTemplate } from "../../templates/PageTemplate.js";

export class PageMovies extends PageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = 1;
        this.pageJS = 'movies';
    }

    async moviesList() {
        let HTML = '';

        const moviesData = await getAllMovies();

        for (const item of moviesData) {
            const img = item.thumbnail ? `/img/movie-thumbnails/${item.thumbnail}` : '/img/default.webp';

            HTML += `
                <div class="col">
                    <div class="card shadow-sm">
                        <img src="${img}" class="movie-card-thumbnail card-img-top" style="height: 225px;">
                        <div class="badge bg-primary movie-card-badge">${item.categoryName}</div>
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
                    <div id="movies" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">${HTML}</div>
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
        const categories = await getAllCategories();
        let catHTML = '<option value="0">All</option>';

        for (const cat of categories) {
            catHTML += `<option value="${cat.id}">${cat.name}</option>`;
        }

        return `
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="display-1">All movies</h1>
                        </div>
                    </div>
                </div>
                <div class="container mb-5">
                    <form action="" class="row">
                        <div class="col-12 col-lg-6">
                            <label>Texts</label>
                            <input class="form-control" type="text">
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <label>Genre</label>
                            <select class="form-control">${catHTML}</select>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <label>Duration</label>
                            <select class="form-control">
                                <option value="0">All</option>
                                <option value="1">0..1 hour</option>
                                <option value="2">1..2 hours</option>
                                <option value="3">2..3 hours</option>
                                <option value="4">3+ hours</option>
                            </select>
                        </div>
                        <div class="col-12 mt-3">
                            <input class="form-check-input" type="checkbox">
                            <label>Only with thumbnails</label>
                        </div>
                    </form>
                </div>
                ${await this.moviesList()}
            </main>`;
    }
}