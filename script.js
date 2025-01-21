// Функции для открытия модальных окон
document.getElementById('store-btn').addEventListener('click', function() {
    document.getElementById('modal-store').style.display = 'flex';
});

document.getElementById('mfg-btn').addEventListener('click', function() {
    document.getElementById('modal-mfg').style.display = 'flex';
});

document.getElementById('montage-btn').addEventListener('click', function() {
    document.getElementById('modal-montage').style.display = 'flex';
});

// Функция для закрытия модальных окон с анимацией
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.add('hide');
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('hide');
            }, 300); // Задержка для завершения анимации
        }
    });
});
