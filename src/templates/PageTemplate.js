export class PageTemplate {
    constructor(req) {
        this.req = req;
        this.activeMenuIndex = -1;
        this.pageJS = '';
        this.isPublicPage = true;
    }

    head() {
        return `
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Movies</title>
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Projekto pavadinimas" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link rel="stylesheet" href="/css/bootstrap.min.css">
                <link rel="stylesheet" href="/css/custom.css">
            </head>`;
    }

    header() {
        const publicMenu = [
            { href: '/', text: 'Home' },
            { href: '/movies', text: 'Movies' },
            { href: '/movies-by-category', text: 'Categories' },
        ];
        const authMenu = [
            { href: '/login', text: 'Login' },
            { href: '/register', text: 'Register' },
        ];
        const userMenu = [
            { href: '/admin', text: 'Dashboard' },
            { href: '/logout', text: 'Logout' },
        ];
        const menu = publicMenu.concat(this.req.user.isLoggedIn ? userMenu : authMenu);

        let menuHTML = '';

        for (let i = 0; i < menu.length; i++) {
            const link = menu[i];
            const active = i === this.activeMenuIndex ? 'active' : '';
            const ariaCurrent = i === this.activeMenuIndex ? 'aria-current="page"' : '';
            menuHTML += `
                <li class="nav-item">
                    <a href="${link.href}" class="nav-link ${active}" ${ariaCurrent}>${link.text}</a>
                </li>`;
        }

        return `
            <div class="container${this.isPublicPage ? '' : '-fluid'}">
                <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <svg class="bi me-2" width="40" height="32" aria-hidden="true" viewBox="0 0 118 94"> <title>Bootstrap</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path> </svg>
                        <span class="fs-4">Simple header</span>
                    </a>
                    <ul class="nav nav-pills">${menuHTML}</ul>
                </header>
            </div>`;
    }

    async main() {
        return '<main>DEMO CONTENT</main>';
    }

    footer() {
        return `
            <div class="container${this.isPublicPage ? '' : '-fluid'}">
                <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p class="col-md-4 mb-0 text-body-secondary">&copy; ${new Date().getFullYear()} Company, Inc</p>
                    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none" aria-label="Bootstrap">
                        <svg class="bi me-2" width="40" height="32" aria-hidden="true" viewBox="0 0 118 94"> <title>Bootstrap</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path> </svg>
                    </a>
                    <ul class="nav col-md-4 justify-content-end">
                        <li class="nav-item">
                            <a href="#" class="nav-link px-2 text-body-secondary">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link px-2 text-body-secondary">Features</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link px-2 text-body-secondary">Pricing</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link px-2 text-body-secondary">FAQs</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link px-2 text-body-secondary">About</a>
                        </li>
                    </ul>
                </footer>
            </div>`;
    }

    script() {
        if (this.pageJS) {
            return `<script src="/js/${this.pageJS}.js"></script>`;
        } else {
            return '';
        }
    }

    async render() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            ${this.head()}
            <body>
                ${this.header()}
                ${await this.main()}
                ${this.footer()}
                ${this.script()}
            </body>
            </html>`;
    }
}