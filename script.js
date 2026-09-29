// Pre-order list feature on the products page
function getSavedList() {
    const data = localStorage.getItem('myList');
    if (data) {
        return JSON.parse(data);
    }
    return [];
}

function saveList(list) {
    localStorage.setItem('myList', JSON.stringify(list));
}

function renderList(list) {
    const ul = document.getElementById('my-list');
    if (!ul) {
        return;
    }
    ul.innerHTML = '';
    for (const item of list) {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    }
}

function addToList(name) {
    const list = getSavedList();
    list.push(name);
    saveList(list);
    renderList(list);
}

function clearList() {
    saveList([]);
    renderList([]);
}

const saveButtons = document.querySelectorAll('.save-btn');
for (const btn of saveButtons) {
    btn.addEventListener('click', function () {
        addToList(this.value);
    });
}

const clearButton = document.getElementById('clear-list');
if (clearButton) {
    clearButton.addEventListener('click', clearList);
}

renderList(getSavedList());

// Form validation on the contact page
function showError(id, message) {
    const span = document.getElementById(id);
    span.textContent = message;
}

function checkRequired(value) {
    return value.trim().length > 0;
}

function checkEmail(value) {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(value);
}

function checkMinLength(value, min) {
    return value.trim().length >= min;
}

const form = document.getElementById('order-form');
if (form) {
    form.addEventListener('submit', function (event) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const details = document.getElementById('item-details').value;
        let valid = true;

        if (!checkRequired(name)) {
            showError('name-error', 'Please enter your name.');
            valid = false;
        } else {
            showError('name-error', '');
        }

        if (!checkEmail(email)) {
            showError('email-error', 'Please enter a valid email address.');
            valid = false;
        } else {
            showError('email-error', '');
        }

        if (!checkMinLength(details, 10)) {
            showError('details-error', 'Please enter at least 10 characters.');
            valid = false;
        } else {
            showError('details-error', '');
        }

        if (!valid) {
            event.preventDefault();
        }
    });
}
