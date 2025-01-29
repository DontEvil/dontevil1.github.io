document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;

    // Проверяем платформу
    if (tg.platform === 'web') {
        try {
            tg.expand(); // Расширяем на весь экран для ПК
            console.log("Web App expanded on PC.");
        } catch (error) {
            console.error('Ошибка при вызове tg.expand:', error);
        }
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

    const buttons = {
        'mfg-btn': 'mfg-modal',
        'montage-btn': 'montage-modal',
        'programs-btn': 'programs-modal',
        'info-btn': 'info-modal'
    };

    Object.keys(buttons).forEach(btnId => {
        document.getElementById(btnId).addEventListener('click', () => {
            playSound();
            const modalId = buttons[btnId];
            document.getElementById(modalId).style.display = 'flex';
            tg.BackButton.show();
        });
    });

    tg.onEvent('backButtonClicked', () => {
        modals.forEach(modal => {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
                tg.BackButton.hide();
            }
        });
    });

    document.getElementById('youtube-btn').addEventListener('click', () => {
        playSound();
        tg.openLink('https://youtube.com/@dontev1l');
    });

    document.getElementById('character-image').addEventListener('click', function () {
        this.style.transform = 'rotate(720deg)';
        setTimeout(() => {
            tg.openLink('https://t.me/dontev1l');
        }, 1000);
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                tg.BackButton.hide();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    tg.BackButton.hide();
                }
            });
        }
    });
});