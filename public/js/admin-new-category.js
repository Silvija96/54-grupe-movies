// const alertDOM = document.getElementById('error');
const formDOM = document.forms[0];
const nameDOM = document.getElementById('name');
const urlDOM = document.getElementById('url');
const descriptionDOM = document.getElementById('description');

if (formDOM) {
    formDOM.addEventListener('submit', event => {
        event.preventDefault();
        // alertDOM.classList.add('d-none');
        // alertDOM.innerText = '';

        const data = {
            name: nameDOM.value,
            url: urlDOM.value,
            description: descriptionDOM.value,
        };

        fetch('/api/admin/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(data => data.json())
            .then(data => {

                console.log(data);

                // if (data.status === 'error') {
                //     alertDOM.innerText = data.msg;
                //     alertDOM.classList.remove('d-none', 'alert-success');
                //     alertDOM.classList.add('alert-danger');
                // }
                // if (data.status === 'success') {
                //     alertDOM.innerText = data.msg;
                //     alertDOM.classList.remove('d-none', 'alert-danger');
                //     alertDOM.classList.add('alert-success');

                //     location.href = data.redirectTo;
                // }
            })
            .catch(err => console.log(err));
    });
}