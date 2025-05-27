export class Badge {
    static default(text, bg = '') {
        return `<div class="badge rounded-pill ${bg}">${text}</div>`;
    }

    static success(text) {
        return Badge.default(text, 'bg-success');
    }

    static warning(text) {
        return Badge.default(text, 'bg-warning');
    }

    static danger(text) {
        return Badge.default(text, 'bg-danger');
    }

    static info(text) {
        return Badge.default(text, 'bg-info');
    }
}