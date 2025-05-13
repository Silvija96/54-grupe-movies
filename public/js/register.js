const alertDOM = document.getElementById('error');
const formDOM = document.forms[0];
const emailDOM = document.getElementById('email');
const passwordDOM = document.getElementById('password');

if (formDOM) {
    formDOM.addEventListener('submit', event => {
        event.preventDefault();
        alertDOM.classList.add('d-none');
        alertDOM.innerText = '';

        const data = {
            email: emailDOM.value,
            password: passwordDOM.value,
        };

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(data => data.json())
            .then(data => {
                if (data.status === 'error') {
                    alertDOM.innerText = data.msg;
                    alertDOM.classList.remove('d-none', 'alert-success');
                    alertDOM.classList.add('alert-danger');
                }
                if (data.status === 'success') {
                    alertDOM.innerText = data.msg;
                    alertDOM.classList.remove('d-none', 'alert-danger');
                    alertDOM.classList.add('alert-success');
                }
            })
            .catch(err => console.log(err));
    });
}