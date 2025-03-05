document.getElementById('clearStorageButton').addEventListener('click', function() {
    localStorage.clear();
    alert('Все записи были удалены!'); // Уведомление о том, что хранилище очищено
});