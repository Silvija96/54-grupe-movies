const formDOM = document.forms[0];
const nameDOM = document.getElementById('name');
const urlDOM = document.getElementById('url');
const descriptionDOM = document.getElementById('description');

if (formDOM) {
    formDOM.addEventListener('submit', event => {
        event.preventDefault();

        const data = {
            name: nameDOM.value,
            url: urlDOM.value,
            description: descriptionDOM.value,
            status: document.querySelector('[name="status"]:checked').value,
        };

        fetch(formDOM.action, {
            method: formDOM.dataset.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(data => data.json())
            .then(data => {
                if (data.status === 'success') {
                    location.href = '/admin/categories';
                }
            })
            .catch(err => console.log(err));
    });
}