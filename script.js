document.addEventListener('DOMContentLoaded', function() {
    const hoverSound = document.getElementById('hoverSound');
    const clickSound = document.getElementById('clickSound');

    // Получаем все кнопки с классом .button
    const buttons = document.querySelectorAll('.button');

    // Звук при наведении на кнопку
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            hoverSound.play();  // Проигрываем звук при наведении
        });

        // Звук при клике на кнопку
        button.addEventListener('click', function() {
            clickSound.play();  // Проигрываем звук при клике
        });
    });

    // Функционал для кнопок
    document.getElementById('mfgBtn').addEventListener('click', function() {
        window.open('https://drive.google.com/file/d/1uLDt0s_8TNg1xtuqR3KP8w4xSIgbLmvy/view', '_blank');
    });

    document.getElementById('montageBtn').addEventListener('click', function() {
        window.open('https://drive.google.com/file/d/1lLObk3qjSrsEjtbfXVAJIYrX7YdY-jrw/view?usp=sharing', '_blank');
    });

    // Здесь можно добавить функциональность для Магазина
    document.getElementById('storeBtn').addEventListener('click', function() {
        alert('Магазин скоро будет доступен!');
    });
});
