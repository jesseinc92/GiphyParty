const giphyForm = document.querySelector('#giphy-form');
const giphyInput = document.querySelector('#search');
const removeBtn = document.querySelector('#remove-button');
const container = document.querySelector('#giphy-container');

const apiKey = 'ae6y3WlFVYJsIhEFgkYa7yprOu4TQb5w';

// add listeners for page actions
giphyForm.addEventListener('submit', getGIF);
removeBtn.addEventListener('click', () => {
    container.innerHTML = '';
});

// get GIF url and create HTML element
async function getGIF(event) {
    event.preventDefault();

    const search = giphyInput.value;
    const response = await axios.get('http://api.giphy.com/v1/gifs/search', {params: {q: search, api_key: apiKey}});

    let randomIndex = Math.floor(Math.random() * response.data.data.length);

    const imageUrl = response.data.data[randomIndex].embed_url;
    const imageWidth = response.data.data[randomIndex].images.original.width;
    const imageHeight = response.data.data[randomIndex].images.original.height;

    const newGIF = createImage(imageUrl, imageWidth, imageHeight);

    container.append(newGIF);
    giphyInput.value = '';
}

function createImage(image, width, height) {
    const newElement = document.createElement('iframe');
    newElement.src = image;
    newElement.width = width;
    newElement.height = height;

    return newElement;
}