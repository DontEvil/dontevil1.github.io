document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;

    // Логирование платформы
    console.log("Platform:", tg.platform);

    // Устанавливаем минимальный размер окна
    tg.MainButton.setParams({
        text: "Закрыть",
        is_visible: true, // Показываем кнопку "Закрыть" по умолчанию
        is_active: false
    });

    // Проверяем платформу и вызываем expand()
    if (tg.platform === 'web') {
        setTimeout(() => {
            try {
                tg.expand(); // Расширяем на весь экран для ПК
                console.log("Web App expanded on PC.");
            } catch (error) {
                console.error('Ошибка при вызове tg.expand:', error);
            }
        }, 100); // Задержка 100 мс
    }

    tg.enableClosingConfirmation(); // Подтверждение закрытия
    tg.BackButton.hide();

    const clickSound = document.getElementById('click-sound');
    const modals = document.querySelectorAll('.modal');

    const playSound = () => {
        try {
            clickSound.currentTime = 0;
            clickSound.play();
        } catch (e) {
            console.log('Sound playback error:', e);
        }
    };

    // Функция для получения параметров из URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Настройка состояния кнопок "Назад" и "Закрыть"
    function setupButtons() {
        if (getQueryParam('back') === 'true' || window.history.length > 1) {
            tg.BackButton.show(); // Показываем кнопку "Назад"
            tg.MainButton.setParams({ is_visible: false }); // Скрываем кнопку "Закрыть"
        } else {
            tg.BackButton.hide(); // Скрываем кнопку "Назад"
            tg.MainButton.setParams({ is_visible: true }); // Показываем кнопку "Закрыть"
        }
    }

    // Вызываем функцию при загрузке страницы
    setupButtons();

    // Обработка кликов на основные кнопки
    const buttons = {
        'mfg-btn': 'mfg-modal',
        'montage-btn': 'montage-modal',
        'programs-btn': 'programs-modal',
        'info-btn': 'info-modal'
    };

    Object.keys(buttons).forEach(btnId => {
        const button = document.getElementById(btnId);
        if (button) {
            button.addEventListener('click', () => {
                playSound();
                const modalId = buttons[btnId];
                document.getElementById(modalId).style.display = 'flex';
                tg.BackButton.show(); // Показываем кнопку "Назад"
                tg.MainButton.setParams({ is_visible: false }); // Скрываем кнопку "Закрыть"
            });
        } else {
            console.warn(`Кнопка с ID "${btnId}" не найдена.`);
        }
    });

    // Обработка клика на кнопку "Магазин"
    document.getElementById('store-btn')?.addEventListener('click', () => {
        try {
            playSound(); // Проигрываем звук при клике
            tg.MainButton.setParams({ is_visible: false }); // Скрываем кнопку "Закрыть"
            tg.BackButton.show(); // Показываем кнопку "Назад"
            window.location.href = 'store.html?back=true'; // Переход на страницу магазина
        } catch (error) {
            console.error('Ошибка при переходе на страницу магазина:', error);
        }
    });

    // Обработка кликов на видео-элементы для открытия модальных окон
    const storeItems = document.querySelectorAll('.store-item');
    storeItems.forEach(item => {
        const video = item.querySelector('.store-video');
        video.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal-id');
            document.getElementById(modalId).style.display = 'flex';
            tg.BackButton.show(); // Показываем кнопку "Назад"
            tg.MainButton.setParams({ is_visible: false }); // Скрываем кнопку "Закрыть"
        });
    });

    // Закрытие модальных окон
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                tg.BackButton.hide(); // Скрываем кнопку "Назад"
                tg.MainButton.setParams({ is_visible: true }); // Показываем кнопку "Закрыть"
            }
        });
    });

    // Обработка кнопки "Назад" в Telegram
    tg.onEvent('backButtonClicked', () => {
        modals.forEach(modal => {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
                tg.BackButton.hide(); // Скрываем кнопку "Назад"
                tg.MainButton.setParams({ is_visible: true }); // Показываем кнопку "Закрыть"
            }
        });

        // Если нет открытых модальных окон и это не главная страница, возвращаемся назад
        if (!modals.some(modal => modal.style.display === 'flex') && window.history.length > 1) {
            window.history.back();
        }
    });

    // Кнопка YouTube
    document.getElementById('youtube-btn')?.addEventListener('click', () => {
        playSound();
        tg.openLink('https://youtube.com/@dontev1l');
    });

    // Кнопка персонажа
    document.getElementById('character-image')?.addEventListener('click', function () {
        this.style.transform = 'rotate(720deg)';
        setTimeout(() => {
            tg.openLink('https://t.me/dontev1l');
        }, 1000);
    });

    // Закрытие модальных окон по клавише Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    tg.BackButton.hide(); // Скрываем кнопку "Назад"
                    tg.MainButton.setParams({ is_visible: true }); // Показываем кнопку "Закрыть"
                }
            });
        }
    });

    // Добавляем обработчики для кнопок в нижней панели
    document.querySelectorAll('.icon-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetPage = button.getAttribute('data-target');
            if (targetPage) {
                playSound();
                tg.MainButton.setParams({ is_visible: false }); // Скрываем кнопку "Закрыть"
                tg.BackButton.show(); // Показываем кнопку "Назад"
                window.location.href = targetPage + '?back=true';
            }
        });
    });

    // Добавляем звуковые эффекты для всех интерактивных кнопок
    document.querySelectorAll('.main-btn, .icon-btn, .store-btn, .order-btn').forEach(button => {
        button.addEventListener('click', () => {
            playSound();
        });
    });
});