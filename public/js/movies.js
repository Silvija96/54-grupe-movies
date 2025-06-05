const formDOM = document.forms[0];
const textInputDOM = formDOM.elements[0];
const genreSelectDOM = formDOM.elements[1];
const durationSelectDOM = formDOM.elements[2];
const thumbnailDOM = formDOM.elements[3];

function getData() {
    const params = new URLSearchParams({
        text: textInputDOM.value,
        genre: genreSelectDOM.value,
        duration: durationSelectDOM.value,
        thumbnail: thumbnailDOM.checked,
    }).toString();


    fetch('/api/movies?' + params)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                console.log(data.content);
            }
        })
        .catch(console.error);

    return [];
}

textInputDOM.addEventListener('keyup', () => {
    console.log('text:', textInputDOM.value);
    getData();
});

genreSelectDOM.addEventListener('change', () => {
    console.log('genre:', genreSelectDOM.value);
    getData();
});

durationSelectDOM.addEventListener('change', () => {
    console.log('duration:', durationSelectDOM.value);
    getData();
});

thumbnailDOM.addEventListener('change', () => {
    console.log('thumbnail:', thumbnailDOM.checked);
    getData();
});