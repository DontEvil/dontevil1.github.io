document.addEventListener('DOMContentLoaded', function() {
    // Звук при нажатии на кнопки
    const buttonClickSound = new Audio('click-sound.mp3');  // Убедитесь, что путь к звуковому файлу верен

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttonClickSound.play();  // Воспроизводим звук нажатия
        });
    });

    // Функции для кнопок
    document.getElementById('storeBtn').addEventListener('click', function() {
        window.open('https://example.com/store', '_blank');  // Открываем ссылку магазина
    });

    document.getElementById('mfgBtn').addEventListener('click', function() {
        window.open('https://drive.google.com/file/d/1uLDt0s_8TNg1xtuqR3KP8w4xSIgbLmvy/view', '_blank');  // Открываем ссылку для MFG 1.0
    });

    document.getElementById('montageBtn').addEventListener('click', function() {
        window.open('https://drive.google.com/file/d/1lLObk3qjSrsEjtbfXVAJIYrX7YdY-jrw/view?usp=sharing', '_blank');  // Открываем ссылку для Монтажа
    });
});
