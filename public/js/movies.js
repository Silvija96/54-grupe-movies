const formDOM = document.forms[0];
const textInputDOM = formDOM.elements[0];
const genreSelectDOM = formDOM.elements[1];
const durationSelectDOM = formDOM.elements[2];
const thumbnailDOM = formDOM.elements[3];

function getData() {
    const data = {};

    if (textInputDOM.value.trim()) {
        data.text = textInputDOM.value.trim();
    }
    if (genreSelectDOM.value !== '0') {
        data.genre = genreSelectDOM.value;
    }
    if (durationSelectDOM.value !== '0') {
        data.duration = durationSelectDOM.value;
    }
    if (thumbnailDOM.checked === true) {
        data.thumbnail = true;
    }

    fetch('/api/movies?' + (new URLSearchParams(data).toString()))
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