// Открыть модальное окно
function openModal() {
    document.getElementById("bookingModal").style.display = "block";
    setCurrentTime();
}

// Закрыть модальное окно
function closeModal() {
    document.getElementById("bookingModal").style.display = "none";
}

// Установить текущее время в часовом поясе МСК
function setCurrentTime() {
    const now = new Date();
    const mskTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
    
    const hours = String(mskTime.getHours()).padStart(2, '0');
    const minutes = String(mskTime.getMinutes()).padStart(2, '0');
    
    document.getElementById('checkinTime').value = `${hours}:${minutes}`;
}

// Рассчитать дату выезда
function calculateCheckout() {
    const checkin = new Date(document.getElementById("checkin").value);
    const duration = parseInt(document.getElementById("duration").value);
    const checkout = new Date(checkin);
    checkout.setDate(checkin.getDate() + duration);
    document.getElementById("checkout").value = checkout.toISOString().split('T')[0];
}

// Рассчитать общую стоимость
function calculateTotal() {
    const roomType = document.getElementById("roomType").value;
    const duration = parseInt(document.getElementById("duration").value);
    let costPerDay;

    switch (roomType) {
        case "Эконом":
            costPerDay = 500;
            break;
        case "Комфорт":
            costPerDay = 900;
            break;
        case "Люкс":
            costPerDay = 1500;
            break;
        default:
            costPerDay = 0;
    }

    const totalCost = costPerDay * duration;
    document.getElementById("totalCost").value = totalCost + ' ₽';
}

// Форматирование даты
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Добавление бронирования в DOM
function addBookingToDOM(guest, checkin, checkout, roomType, paymentStatus, index) {
    const newRow = document.createElement("div");
    newRow.className = "row";
    newRow.innerHTML = `
        <div class="column">${guest}</div>
        <div class="column">${formatDate(checkin)}</div>
        <div class="column">${formatDate(checkout)}</div>
        <div class="column"><div class="back">${roomType.toUpperCase()}</div></div>
        <div class="column"><div class="back">${paymentStatus.toUpperCase()}</div></div>
        <div class="column"><a href="#" class="edit" onclick="editBooking(${index})">Edit</a></div>
    `;
    document.querySelector(".contents").appendChild(newRow);
}
    
// Сохранение бронирования
function submitBooking() {
    const checkinTime = document.getElementById("checkinTime").value;
    const guest = document.getElementById("guest").value;
    const checkin = document.getElementById("checkin").value;
    const duration = document.getElementById("duration").value;
    const checkout = document.getElementById("checkout").value;
    const roomType = document.getElementById("roomType").value;
    const paymentStatus = document.getElementById("paymentStatus").value;
    const totalCost = document.getElementById("totalCost").value.replace(' ₽', '');
    
    const bookingData = {
        checkinTime,
        guest,
        checkin,
        duration,
        checkout,
        roomType,
        paymentStatus,
        totalCost
    };
    
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
    // Если редактируем, обновляем существующее бронирование
    if (window.currentEditingIndex !== undefined) {
        bookings[window.currentEditingIndex] = bookingData;
        window.currentEditingIndex = undefined; // Сброс индекса
    } else {
        // В противном случае добавляем новое бронирование
        bookings.push(bookingData);
    }
    
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Добавляем строку в DOM на странице bookingsPage.html
    if (window.location.pathname.endsWith("bookingsPage.html")) {
        // Очищаем содержимое перед добавлением
        document.querySelector(".contents").innerHTML = '';
        bookings.forEach((booking, index) => {
            addBookingToDOM(booking.guest, booking.checkin, booking.checkout, booking.roomType, booking.paymentStatus, index);
        });
    }
    
    // Закрываем модальное окно
    closeModal();
}
    
function editBooking(index) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const booking = bookings[index];
    
    // Заполняем поля модального окна данными бронирования
    document.getElementById('checkinTime').value = booking.checkinTime;
    document.getElementById('guest').value = booking.guest;
    document.getElementById('checkin').value = booking.checkin;
    document.getElementById('duration').value = booking.duration;
    document.getElementById('checkout').value = booking.checkout;
    document.getElementById('roomType').value = booking.roomType;
    document.getElementById('paymentStatus').value = booking.paymentStatus;
    document.getElementById('totalCost').value = booking.totalCost;
    
    // Открываем модальное окно
    openModal();
    
    // Сохраняем индекс текущего бронирования для обновления
    window.currentEditingIndex = index;
}
    
// Загружаем данные из localStorage при загрузке страницы
window.onload = function() {
    // Загружаем данные из localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
    // Добавляем каждое бронирование в DOM
    bookings.forEach(booking => {
        addBookingToDOM(booking.guest, booking.checkin, booking.checkout, booking.roomType, booking.paymentStatus);
    });
};