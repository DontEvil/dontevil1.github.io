// Получаем элемент аудио
const clickSound = document.getElementById('click-sound');

// Функции для открытия модальных окон и воспроизведения звука
document.getElementById('mfg-btn').addEventListener('click', function() {
    clickSound.play();  // Воспроизводим звук
    document.getElementById('modal-mfg').style.display = 'flex';
});

document.getElementById('montage-btn').addEventListener('click', function() {
    clickSound.play();  // Воспроизводим звук
    document.getElementById('modal-montage').style.display = 'flex';
});

document.getElementById('info-btn').addEventListener('click', function() {
    clickSound.play();  // Воспроизводим звук
    document.getElementById('modal-info').style.display = 'flex';
});

// Закрытие модальных окон при клике вне их контента
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Функция для вращения картинки на 720 градусов и перехода на Telegram канал
document.getElementById('character-image').addEventListener('click', function() {
    this.style.transition = 'transform 1s';
    this.style.transform = 'rotate(720deg)';
    setTimeout(() => {
        window.location.href = 'https://t.me/dontev1l';
    }, 1000); // После анимации перейдем по ссылке
});
