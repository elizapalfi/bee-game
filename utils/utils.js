function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function fetchElementById(id) {
    return document.getElementById(id);
}

function createElement(tag) {
    return document.createElement(tag);
}

function createElementWithClass(tag, className) {
    const element = createElement(tag);
    element.classList.add(className);

    return element;
}
