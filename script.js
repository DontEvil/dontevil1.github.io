document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;

    // Проверяем, доступен ли Telegram WebApp
    if (!tg) {
        console.error("Telegram WebApp не поддерживается в этом контексте.");
        return;
    }

    // Логирование платформы
    console.log("Platform:", tg.platform);

    // Устанавливаем минимальный размер окна
    tg.MainButton.setParams({
        text: "Закрыть",
        is_visible: true, // Показываем кнопку "Закрыть" по умолчанию
        is_active: true // Кнопка становится активной
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

    // Функция для навигации с обновлением истории
    function navigateTo(pageUrl) {
        const url = new URL(pageUrl, window.location.origin);
        url.searchParams.append('back', 'true'); // Добавляем параметр back=true
        history.pushState({}, '', url.toString()); // Обновляем историю
        window.location.reload(); // Перезагружаем страницу
    }

    // Настройка состояния кнопок "Назад" и "Закрыть"
    function setupButtons() {
        if (getQueryParam('back') === 'true' || window.history.length > 1) {
            if (tg.BackButton.isAvailable()) {
                tg.BackButton.show(); // Показываем кнопку "Назад"
                tg.BackButton.onClick(() => {
                    console.log("Кнопка 'Назад' была нажата!");
                    if (window.history.length > 1) {
                        window.history.back(); // Возвращаемся на предыдущую страницу
                    } else {
                        tg.close(); // Закрываем Web App, если история пуста
                    }
                });
            }
            tg.MainButton.setParams({ is_visible: false }); // Скрываем кнопку "Закрыть"
        } else {
            tg.BackButton.hide(); // Скрываем кнопку "Назад"
            tg.MainButton.setParams({
                text: "Закрыть",
                is_visible: true,
                is_active: true // Кнопка становится активной
            });
            tg.MainButton.onClick(() => {
                console.log("Кнопка 'Закрыть' была нажата!");
                tg.close(); // Закрываем Web App
            });
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
                if (tg.BackButton.isAvailable()) {
                    tg.BackButton.show(); // Показываем кнопку "Назад"
                }
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
            if (tg.BackButton.isAvailable()) {
                tg.BackButton.show(); // Показываем кнопку "Назад"
            }
            navigateTo('store.html'); // Переход на страницу магазина
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
            if (tg.BackButton.isAvailable()) {
                tg.BackButton.show(); // Показываем кнопку "Назад"
            }
            tg.MainButton.setParams({ is_visible: false }); // Скрываем кнопку "Закрыть"
        });
    });

    // Закрытие модальных окон
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                if (tg.BackButton.isAvailable()) {
                    tg.BackButton.hide(); // Скрываем кнопку "Назад"
                }
                tg.MainButton.setParams({
                    text: "Закрыть",
                    is_visible: true,
                    is_active: true // Кнопка становится активной
                }); // Показываем кнопку "Закрыть"
            }
        });
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
                    if (tg.BackButton.isAvailable()) {
                        tg.BackButton.hide(); // Скрываем кнопку "Назад"
                    }
                    tg.MainButton.setParams({
                        text: "Закрыть",
                        is_visible: true,
                        is_active: true // Кнопка становится активной
                    }); // Показываем кнопку "Закрыть"
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
                if (tg.BackButton.isAvailable()) {
                    tg.BackButton.show(); // Показываем кнопку "Назад"
                }
                navigateTo(targetPage);
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