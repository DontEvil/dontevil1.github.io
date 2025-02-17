document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;

    // Проверяем, доступен ли Telegram WebApp
    if (!tg) {
        console.error("Telegram WebApp не поддерживается.");
        return;
    }

    // Логирование платформы
    console.log("Platform:", tg.platform);

    // Устанавливаем минимальный размер окна
    tg.MainButton.setParams({
        text: "Закрыть",
        is_visible: true,
        is_active: true
    });

    // Массив для хранения истории страниц
    let historyStack = ['/']; // Начальная страница
    let currentHistoryIndex = 0;

    // Функция для перехода на новую страницу
    function navigateToPage(pageUrl) {
        // Если пользователь переходит на новую страницу, обрезаем историю после текущего индекса
        if (currentHistoryIndex < historyStack.length - 1) {
            historyStack = historyStack.slice(0, currentHistoryIndex + 1);
        }
        // Добавляем новую страницу в историю
        historyStack.push(pageUrl);
        currentHistoryIndex++;

        // Обновляем URL страницы
        history.pushState({ page: pageUrl }, '', pageUrl);

        // Перезагружаем содержимое страницы
        location.reload();
    }

    // Функция для возврата назад
    function goBack() {
        if (currentHistoryIndex > 0) {
            currentHistoryIndex--;
            const previousPage = historyStack[currentHistoryIndex];
            history.replaceState({ page: previousPage }, '', previousPage);
            location.reload(); // Обновляем страницу для применения изменений
        } else {
            tg.close(); // Закрываем Web App, если история пуста
        }
    }

    // Настройка состояния кнопок "Назад" и "Закрыть"
    function setupButtons() {
        if (currentHistoryIndex > 0) {
            tg.BackButton.show();
            tg.BackButton.onClick(() => {
                goBack();
            });
            tg.MainButton.setParams({ is_visible: false });
        } else {
            tg.BackButton.hide();
            tg.MainButton.setParams({
                text: "Закрыть",
                is_visible: true,
                is_active: true
            });
            tg.MainButton.onClick(() => {
                tg.close();
            });
        }
    }

    // Проверяем платформу и вызываем expand()
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

    tg.enableClosingConfirmation();

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
                tg.BackButton.show();
                tg.MainButton.setParams({ is_visible: false });
            });
        } else {
            console.warn(`Кнопка с ID "${btnId}" не найдена.`);
        }
    });

    // Обработка клика на кнопку "Магазин"
    document.getElementById('store-btn')?.addEventListener('click', () => {
        try {
            playSound();
            tg.MainButton.setParams({ is_visible: false });
            tg.BackButton.show();
            navigateToPage('store.html'); // Переход на страницу магазина
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
            tg.BackButton.show();
            tg.MainButton.setParams({ is_visible: false });
        });
    });

    // Закрытие модальных окон
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                tg.BackButton.hide();
                tg.MainButton.setParams({
                    text: "Закрыть",
                    is_visible: true,
                    is_active: true
                });
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
                    tg.BackButton.hide();
                    tg.MainButton.setParams({
                        text: "Закрыть",
                        is_visible: true,
                        is_active: true
                    });
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
                tg.MainButton.setParams({ is_visible: false });
                tg.BackButton.show();
                navigateToPage(targetPage);
            }
        });
    });

    // Добавляем звуковые эффекты для всех интерактивных кнопок
    document.querySelectorAll('.main-btn, .icon-btn, .store-btn, .order-btn').forEach(button => {
        button.addEventListener('click', () => {
            playSound();
        });
    });

    // Вызываем функцию при загрузке страницы
    setupButtons();
});