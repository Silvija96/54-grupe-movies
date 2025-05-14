const formDOM = document.forms[0];

if (formDOM) {
    formDOM.addEventListener('submit', event => {
        event.preventDefault();

        fetch('/api/logout', {
            method: 'GET',
        })
            .then(() => location.href = '/')
            .catch(err => console.log(err));
    });
}