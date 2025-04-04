function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || null;
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}
