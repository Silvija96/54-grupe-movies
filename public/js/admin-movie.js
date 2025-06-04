const imageFormDOM = document.forms[0];
const uploadDOM = document.getElementById('thumbnail');
const imageDOM = document.getElementById('image');

const contentFormDOM = document.forms[1];
const nameDOM = document.getElementById('name');
const urlDOM = document.getElementById('url');
const descriptionDOM = document.getElementById('description');
const durationHoursDOM = document.getElementById('duration_hours');
const durationMinutesDOM = document.getElementById('duration_minutes');
const categoryDOM = document.getElementById('category');

if (imageFormDOM) {
    imageFormDOM
        .querySelector('input')
        .addEventListener('change', (e) => {
            const formData = new FormData();
            formData.append('thumbnail', e.target.files[0]);

            fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        imageDOM.src = data.msg;
                    }
                })
                .catch(console.error);
        });
}

if (contentFormDOM) {
    contentFormDOM.addEventListener('submit', event => {
        event.preventDefault();

        const data = {
            name: nameDOM.value,
            url: urlDOM.value,
            status: document.querySelector('[name="status"]:checked').value,
        };

        if (descriptionDOM.value) {
            data.description = descriptionDOM.value;
        }
        if (+durationHoursDOM.value) {
            data.hours = +durationHoursDOM.value;
        }
        if (+durationMinutesDOM.value) {
            data.minutes = +durationMinutesDOM.value;
        }
        if (+categoryDOM.value) {
            data.category = +categoryDOM.value;
        }

        const imageURL = new URL(imageDOM.src);

        if (imageURL.pathname !== '/img/default.webp') {
            data.image = imageURL.pathname;
        }

        fetch(contentFormDOM.action, {
            method: contentFormDOM.dataset.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    });
}