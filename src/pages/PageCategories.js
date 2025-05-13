import { categoriesList } from "../components/categoriesList.js";
import { PageTemplate } from "../templates/PageTemplate.js";

export class PageCategories extends PageTemplate {
    constructor(req) {
        super();
        this.req = req;
        this.activeMenuIndex = 2;
    }

    main() {
        return `
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="display-1">All categories</h1>
                        </div>
                    </div>
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
                    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        ${categoriesList()}
                    </div>
                </div>
            </main>`;
    }
}