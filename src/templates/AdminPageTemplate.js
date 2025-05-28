import { adminSidebarData } from "../data/adminSidebarData.js";
import { PageTemplate } from "./PageTemplate.js";

export class AdminPageTemplate extends PageTemplate {
    constructor(req) {
        super(req);
        this.activeMenuIndex = -1;
        this.pageJS = '';
        this.isPublicPage = false;
    }

    adminSidebar() {
        let HTML = '';

        for (const item of adminSidebarData) {
            if (item.type === 'hr') {
                HTML += `<hr class="my-3">`;
            }

            if (item.type === 'h6') {
                HTML += `
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                        <span>${item.text}</span>
                    </h6>`;
            }

            if (item.type === 'ul') {
                let liHTML = '';

                for (const li of item.list) {
                    liHTML += `
                        <li class="nav-item">
                            <a class="nav-link d-flex align-items-center gap-2 ${this.req.url === li.href ? 'active' : ''}" aria-current="page" href="/admin${li.href}">
                                ${li.text}
                            </a>
                        </li>`;
                }

                HTML += `
                    <ul class="nav nav-pills flex-column">
                        ${liHTML}
                    </ul>`;
            }
        }

        return `
            <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="sidebarMenuLabel">Company name</h5> <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body d-md-flex flex-column p-3 pt-lg-3 overflow-y-auto">
                        ${HTML}
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