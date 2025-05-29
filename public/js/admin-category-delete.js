const buttonsDeleteDOM = document.querySelectorAll('table button');

for (const btnDOM of buttonsDeleteDOM) {
    btnDOM.addEventListener('click', () => {
        fetch('/api/admin/categories/' + btnDOM.dataset.id, {
            method: 'DELETE',
        })
            .then(data => data.json())
            .then(data => {
                btnDOM.parentNode.parentNode.parentNode.remove();
            })
            .catch(err => console.log(err));
    });
}