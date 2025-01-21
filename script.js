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

// Функция для закрытия модальных окон
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Функция для вращения картинки на 720 градусов
document.getElementById('character-image').addEventListener('click', function() {
    this.style.transform = 'rotate(720deg)';
    this.style.transition = 'transform 0.5s ease-in-out';
    
    // Возвращаем начальное положение картинки через небольшой промежуток времени
    setTimeout(() => {
        this.style.transform = 'rotate(0deg)';
    }, 500); // 500ms - время анимации
});
