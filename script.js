document.addEventListener('DOMContentLoaded', () => {
    const clickSound = document.getElementById('click-sound');
    const modals = document.querySelectorAll('.modal');
    
    // Обработчики основных кнопок
    const buttons = {
        'mfg-btn': 'mfg-modal',
        'montage-btn': 'montage-modal',
        'programs-btn': 'programs-modal',
        'info-btn': 'info-modal'
    };

    Object.keys(buttons).forEach(btnId => {
        document.getElementById(btnId).addEventListener('click', () => {
            clickSound.play();
            const modalId = buttons[btnId];
            document.getElementById(modalId).style.display = 'flex';
        });
    });

    // YouTube кнопка
    document.getElementById('youtube-btn').addEventListener('click', () => {
        clickSound.play();
        window.open('https://youtube.com/@dontev1l', '_blank');
    });

    // Персонаж
    document.getElementById('character-image').addEventListener('click', function() {
        this.style.transform = 'rotate(720deg)';
        setTimeout(() => {
            window.location.href = 'https://t.me/dontev1l';
        }, 1000);
    });

    // Закрытие модалок
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Закрытие на ESC
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                modal.style.display = 'none';
            }
        });
    });
});