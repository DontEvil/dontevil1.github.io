// Функции для открытия модальных окон
document.getElementById('store-btn').addEventListener('click', function() {
    document.getElementById('modal-store').style.display = 'flex';
    document.getElementById('click-sound').play();
});

document.getElementById('mfg-btn').addEventListener('click', function() {
    document.getElementById('modal-mfg').style.display = 'flex';
    document.getElementById('click-sound').play();
});

document.getElementById('montage-btn').addEventListener('click', function() {
    document.getElementById('modal-montage').style.display = 'flex';
    document.getElementById('click-sound').play();
});

// Функция для закрытия модальных окон
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Переключение между ночным и дневным режимами
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('night');
    document.querySelectorAll('.button').forEach(button => {
        button.classList.toggle('night');
    });
});

// Функция для вращения картинки на 720 градусов
document.getElementById('character-image').addEventListener('click', function() {
    this.style.transform = 'rotate(720deg)';
    this.style.transition = 'transform 0.5s ease-in-out';
    
    setTimeout(() => {
        this.style.transform = 'rotate(0deg)';
    }, 500); // 500ms - время анимации
});

// Инициализация AOS для анимаций при прокрутке
AOS.init();
