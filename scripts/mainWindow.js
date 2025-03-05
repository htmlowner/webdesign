// Функция для форматирования даты
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', options);
}

// Загружаем данные из localStorage и отображаем их
window.onload = function() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.forEach(booking => {
        addBookingToDOM(booking.checkinTime, booking.guest, booking.paymentStatus, booking.totalCost);
    });
};

// Функция для добавления строки в DOM
function addBookingToDOM(checkinTime, guest, paymentStatus, totalCost) {
    const newRow = document.createElement("div");
    newRow.className = "row";
    newRow.innerHTML = `
        <div class="column">${checkinTime}</div>
        <div class="column">${guest}</div>
        <div class="column"><div class="back">${paymentStatus.toUpperCase()}</div></div>
        <div class="column">${totalCost}₽</div>
    `;
    document.querySelector(".contents").appendChild(newRow);
}