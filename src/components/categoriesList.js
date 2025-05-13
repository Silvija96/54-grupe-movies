import { categoriesData } from "../data/categories.js";

export function categoriesList(amount = 0) {
    let HTML = '';
    const data = [...categoriesData];

    if (amount > 0) {
        data.sort((a, b) => b.count - a.count);
    }

    for (const item of data) {
        HTML += `
            <div class="feature col">
                <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                    ${item.icon}
                </div>
                <h3 class="fs-2 text-body-emphasis">${item.title}</h3>
                <p>Count: ${item.count}</p>
                <p>${item.description}</p>
                <a href="/movies-by-category/${item.slug}" class="icon-link">
                    View category
                    <svg class="bi" aria-hidden="true" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path> </svg>
                </a>
            </div>`;

        if (--amount === 0) {
            break;
        }
    }

    return HTML;
}