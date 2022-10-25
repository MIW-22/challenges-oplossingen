function writeOnPage(text) {
    let paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(text));
    document.body.prepend(paragraph);
}

async function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function getJson(url) {
    return fetch(url).then(res => res.json())
}

