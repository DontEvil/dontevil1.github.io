document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;

    // Логирование платформы
    console.log("Platform:", tg.platform);

    // Устанавливаем минимальный размер окна
    tg.MainButton.setParams({
        text: "Закрыть",
        is_visible: false
    });

    // Расширяем на весь экран для ПК
    if (tg.platform === 'web') {
        setTimeout(() => {
            try {
                tg.expand();
                console.log("Web App expanded on PC.");
            } catch (error) {
                console.error('Ошибка при вызове tg.expand:', error);
            }
        }, 100);
    }

    // Подтверждение закрытия
    tg.enableClosingConfirmation();

    // Скрываем кнопку "назад" при загрузке
    tg.BackButton.hide();

    // Звуковой эффект
    const clickSound = document.getElementById('click-sound');
    const playSound = () => {
        try {
            clickSound.currentTime = 0;
            clickSound.play();
        } catch (e) {
            console.log('Sound playback error:', e);
        }
    };

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
                openModal(modalId);
            });
        } else {
            console.warn(`Кнопка с ID "${btnId}" не найдена.`);
        }
    });

    // Обработка клика на кнопку "Магазин"
    document.getElementById('store-btn')?.addEventListener('click', () => {
        try {
            playSound();
            window.location.href = 'store.html';
        } catch (error) {
            console.error('Ошибка при переходе на страницу магазина:', error);
        }
    });

    // Настройка кнопки "Назад" для переходов между страницами
    function setupBackButton() {
        if (document.referrer) {
            tg.BackButton.show();
            tg.BackButton.onClick(() => {
                window.history.back();
            });
        } else {
            tg.BackButton.hide();
        }
    }
    setupBackButton();

    // Функции для работы с модальными окнами
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            tg.BackButton.show(); // Показываем кнопку "назад"
        } else {
            console.error(`Модальное окно с ID "${modalId}" не найдено.`);
        }
    };

    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            tg.BackButton.hide(); // Скрываем кнопку "назад"
        }
    };

    // Закрытие модальных окон
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Обработка кнопки "Назад" в Telegram
    tg.onEvent('backButtonClicked', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.style.display === 'flex') {
                closeModal(modal.id);
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
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'flex') {
                    closeModal(modal.id);
                }
            });
        }
    });

    // Обработка кнопок в нижней панели
    document.querySelectorAll('.icon-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetPage = button.getAttribute('data-target');
            if (targetPage) {
                playSound();
                window.location.href = targetPage;
            }
        });
    });

    // Добавляем звуковые эффекты для всех интерактивных кнопок
    document.querySelectorAll('.main-btn, .icon-btn, .store-btn, .order-btn').forEach(button => {
        button.addEventListener('click', () => {
            playSound();
        });
    });

    // Обработка кликов на видео для открытия модальных окон (для animations.html)
    document.querySelectorAll('.store-item').forEach(item => {
        const video = item.querySelector('.store-video');
        if (video) {
            video.addEventListener('click', (e) => {
                e.stopPropagation(); // Предотвращаем конфликты с другими обработчиками
                playSound();
                const modalId = item.getAttribute('data-modal-id');
                console.log(`Открытие модального окна с ID: ${modalId}`);
                if (modalId) {
                    openModal(modalId);
                } else {
                    console.error('Атрибут data-modal-id не задан.');
                }
            });
        }
    });
});