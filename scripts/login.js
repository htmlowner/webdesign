let users = {};

fetch('../config/users.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Сеть не в порядке: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        users = data.users;
    })
    .catch(error => {
        console.error('Ошибка при загрузке файла users.json:', error);
    });

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim(); 

    if (users[username] && users[username] === password) {
        localStorage.setItem('username', username);
        window.location.href = '../pages/mainPage.html';
    } else {
        alert('Неверное имя пользователя или пароль!');
    }
}
