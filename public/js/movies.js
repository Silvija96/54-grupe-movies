const moviesDOM = document.getElementById('movies');
const formDOM = document.forms[0];
const textInputDOM = formDOM.elements[0];
const genreSelectDOM = formDOM.elements[1];
const durationSelectDOM = formDOM.elements[2];
const thumbnailDOM = formDOM.elements[3];

let timer = null;

function formatMovieDuration(duration) {
    if (duration < 60) {
        return `${duration} mins`;
    }

    return `${Math.floor(duration / 60)} h ${duration % 60} mins`;
}

function renderCards(data) {
    let HTML = '';

    for (const item of data) {
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

    moviesDOM.innerHTML = HTML;
}

function getData() {
    clearTimeout(timer);

    timer = setTimeout(() => {
        const data = {};

        if (textInputDOM.value.trim()) {
            data.text = textInputDOM.value.trim();
        }
        if (genreSelectDOM.value !== '0') {
            data.genre = genreSelectDOM.value;
        }
        if (durationSelectDOM.value !== '0') {
            data.duration = durationSelectDOM.value;
        }
        if (thumbnailDOM.checked === true) {
            data.thumbnail = true;
        }

        fetch('/api/movies?' + (new URLSearchParams(data).toString()))
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    renderCards(data.content);
                }
            })
            .catch(console.error);
    }, 300);
}

textInputDOM.addEventListener('keyup', getData);
genreSelectDOM.addEventListener('change', getData);
durationSelectDOM.addEventListener('change', getData);
thumbnailDOM.addEventListener('change', getData);