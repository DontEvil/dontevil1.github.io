// Получаем элементы модальных окон
const modals = document.querySelectorAll('.modal');
const clickSound = document.getElementById('click-sound');

// Функции для открытия модальных окон и воспроизведения звука
document.getElementById('mfg-btn').addEventListener('click', function() {
    clickSound.play();  // Воспроизводим звук
    openModal('modal-mfg'); // Открыть модальное окно для MFG
});

document.getElementById('montage-btn').addEventListener('click', function() {
    clickSound.play();  // Воспроизводим звук
    openModal('modal-montage'); // Открыть модальное окно для Монтаж
});

document.getElementById('info-btn').addEventListener('click', function() {
    clickSound.play();  // Воспроизводим звук
    openModal('modal-info'); // Открыть модальное окно для Информация
});

// Закрытие модальных окон при клике вне их контента
modals.forEach(modal => {
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal(modal); // Закрыть модальное окно
        }
    });
});

// Функция для открытия модальных окон
function openModal(modalId) {
    // Скрываем все модальные окна
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.style.opacity = '0'; // Начальная непрозрачность
        modal.setAttribute('aria-hidden', 'true');
    });

    // Находим и отображаем выбранное модальное окно
    const modalToShow = document.getElementById(modalId);
    modalToShow.style.display = 'flex';
    setTimeout(() => {
        modalToShow.style.opacity = '1'; // Устанавливаем финальную непрозрачность
        modalToShow.setAttribute('aria-hidden', 'false');
    }, 10); // Задержка для плавного перехода
}

// Функция для закрытия модальных окон
function closeModal(modal) {
    modal.style.opacity = '0'; // Начинаем анимацию закрытия
    setTimeout(() => {
        modal.style.display = 'none'; // Скрываем окно после завершения анимации
        modal.setAttribute('aria-hidden', 'true');
    }, 300); // Задержка, чтобы дать время на анимацию
}

// Функция для вращения картинки на 720 градусов и перехода на новый путь
document.getElementById('character-image').addEventListener('click', function() {
    this.style.transition = 'transform 1s ease-in-out';
    this.style.transform = 'rotate(720deg)';
    
    // Задержка на время завершения анимации (1 секунда)
    setTimeout(() => {
        // Переход на ваш Телеграм канал после анимации
        window.location.href = 'https://t.me/dontev1l';
    }, 1000); // Задержка, соответствующая времени анимации (1 секунда)
});
