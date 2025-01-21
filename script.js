// Функции для открытия модальных окон
document.getElementById('store-btn')?.addEventListener('click', function() {
    playClickSound();  // Воспроизводим звук при нажатии
    document.getElementById('modal-store').style.display = 'flex';
});

document.getElementById('mfg-btn')?.addEventListener('click', function() {
    playClickSound();  // Воспроизводим звук при нажатии
    document.getElementById('modal-mfg').style.display = 'flex';
});

document.getElementById('montage-btn')?.addEventListener('click', function() {
    playClickSound();  // Воспроизводим звук при нажатии
    document.getElementById('modal-montage').style.display = 'flex';
});

document.getElementById('info-btn')?.addEventListener('click', function() { // Для кнопки "Информация"
    playClickSound();  // Воспроизводим звук при нажатии
    document.getElementById('modal-info').style.display = 'flex';
});

// Функция для воспроизведения звука
function playClickSound() {
    const sound = document.getElementById('click-sound');
    sound.currentTime = 0; // Сбрасываем время воспроизведения на начало
    sound.volume = 0.3;     // Устанавливаем громкость на 30% (0.0 - 1.0)
    sound.play();
}

// Функция для закрытия модальных окон
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Функция для вращения картинки на 720 градусов и перехода на Telegram канал
document.getElementById('character-image').addEventListener('click', function() {
    // Вращаем картинку на 720 градусов
    this.style.transform = 'rotate(720deg)';
    this.style.transition = 'transform 0.5s ease-in-out';
    this.style.transformOrigin = 'center center'; // Устанавливаем точку вращения в центр

    // После завершения анимации (0.5s) переходим по ссылке
    setTimeout(() => {
        window.location.href = 'https://t.me/dontev1l'; // Переход на твой Telegram канал
    }, 500); // 500ms - время, равное продолжительности анимации
});
