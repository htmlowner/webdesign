document.querySelector('.send').addEventListener('click', function() {
    const message = document.querySelector('.mainWindow').value; // Получаем текст из текстового поля
    const botToken = '7309155277:AAEkLMtXd0VIuxaYrevccUYjHcVpn9TcZck'; // Замените на ваш токен
    const chatId = '6767770611'; // Замените на ваш chat_id
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Получаем логин пользователя из localStorage
    const username = localStorage.getItem('username'); // Замените 'username' на ключ, который вы используете
    const fullMessage = `Пользователь: ${username}\nОшибка: ${message}`; // Формируем полное сообщение

    // Создаем объект с данными для отправки
    const data = {
        chat_id: chatId,
        text: fullMessage
    };

    // Отправляем POST-запрос с помощью fetch
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Сообщение отправлено успешно!');
            document.querySelector('.mainWindow').value = ''; // Очищаем текстовое поле
        } else {
            alert('Ошибка при отправке сообщения: ' + data.description);
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке сообщения.');
    });
});
