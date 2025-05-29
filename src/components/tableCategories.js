import { Badge } from "./Badge.js";

export function tableCategories(data) {
    let HTML = '';

    for (const item of data) {
        const desc = item.description ? Badge.success('Provided') : Badge.danger('Missing');
        const status = item.is_published ? Badge.success('Published') : Badge.warning('Draft');

        HTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.count}</td>
                <td>${item.url_slug}</td>
                <td>${desc}</td>
                <td>${status}</td>
                <td>
                    <div style="display: flex; gap: 0.3rem;">
                        <a class="btn btn-primary" href="/admin/categories/${item.url_slug}/edit">Edit</a>
                        <button data-id="${item.id}" class="btn btn-danger" type="button">Delete</button>
                    </div>
                </td>
            </tr>`;
    }

    return `
        <div class="table-responsive small">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Movies count</th>
                        <th scope="col">Url</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>${HTML}</tbody>
            </table>
        </div>`;
}