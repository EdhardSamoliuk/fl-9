'use strict'
let login = prompt('Enter your login');

if (!login) {
    alert('Canceled.');
} else if (login.length < 4) {
    alert('I don\'t know any users having name length less than 4 symbols');
} else if (login !== 'User') {
    alert('I don’t know you');
} else if (login === 'User') {
    let password = prompt('Enter your password');
    if (!password) {
        alert('Canceled.');
    } else if (password === 'SuperUser') {
        alert(new Date().getHours() < 20 ? 'Good day!' : 'Good evening!')
    } else {
        alert('Wrong password');
    }
}
